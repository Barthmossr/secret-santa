import { Header } from '@/components/Header'
import { RequestForm } from '@/components/RequestForm'
import Link from 'next/link'

export default function NewRequestPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="text-red-600 hover:underline">
            ← Voltar para Lista
          </Link>
        </div>
        <RequestForm />
      </div>
    </main>
  )
}
