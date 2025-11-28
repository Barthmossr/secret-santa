import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { RequestCard } from '@/components/RequestCard'
import { Header } from '@/components/Header'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: requests } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header />
      
      <div className="container mx-auto px-4">
        <div className="flex justify-center -mt-8 mb-12 relative z-20">
          <Link
            href="/new"
            className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <span>🎅</span> Adicionar Desejos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests?.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>

        {(!requests || requests.length === 0) && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-xl">Nenhum pedido ainda. Seja o primeiro! 🎄</p>
          </div>
        )}
      </div>
    </main>
  )
}
