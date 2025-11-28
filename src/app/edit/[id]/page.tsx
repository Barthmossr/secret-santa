import { Header } from '@/components/Header'
import { RequestForm } from '@/components/RequestForm'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const { data: request } = await supabase
    .from('requests')
    .select('*')
    .eq('id', id)
    .single()

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
