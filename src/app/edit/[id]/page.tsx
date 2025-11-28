'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { RequestForm } from '@/components/RequestForm'
import { isOwnedRequest } from '@/lib/requestOwnership'
import { Request } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface EditRequestPageProps {
  params: Promise<{ id: string }>
}

export default function EditRequestPage({ params }: EditRequestPageProps) {
  const [id, setId] = useState<string | null>(null)
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    async function loadRequest() {
      const resolvedParams = await params
      setId(resolvedParams.id)

      if (!isOwnedRequest(resolvedParams.id)) {
        setAccessDenied(true)
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/requests/${resolvedParams.id}`)
        if (!res.ok) {
          notFound()
        }
        const data = await res.json()
        setRequest(data)
      } catch {
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadRequest()
  }, [params])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 pb-20">
        <Header />
        <div className="container mx-auto px-4 text-center mt-12">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </main>
    )
  }

  if (accessDenied) {
    return (
      <main className="min-h-screen bg-slate-50 pb-20">
        <Header />
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto mt-12 bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">
              Acesso Negado
            </h2>
            <p className="text-red-600 mb-6">
              Você não tem permissão para editar este pedido.
            </p>
            <Link
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Voltar para Lista
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (!request) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="text-red-600 hover:underline">
            ← Voltar para Lista
          </Link>
        </div>
        <RequestForm initialData={request} />
      </div>
    </main>
  )
}
