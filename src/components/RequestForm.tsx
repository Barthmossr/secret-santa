'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Request } from '@/types'

interface RequestFormProps {
  initialData?: Request
}

export function RequestForm({ initialData }: RequestFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      item_1: formData.get('item_1'),
      item_2: formData.get('item_2'),
      item_3: formData.get('item_3'),
    }

    try {
      const url = initialData 
        ? `/api/requests/${initialData.id}` 
        : '/api/requests'
      
      const method = initialData ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Falha ao salvar')
      }

      router.push('/')
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-red-100 max-w-lg mx-auto">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Seu Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={initialData?.name}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
          placeholder="Ex: João Silva"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <span className="text-xl">🎁</span> Lista de Desejos
        </h4>
        
        <div>
          <label htmlFor="item_1" className="block text-sm font-medium text-gray-700 mb-1">
            Item 1 (Obrigatório)
          </label>
          <input
            type="text"
            name="item_1"
            id="item_1"
            required
            defaultValue={initialData?.item_1}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="Ex: Camisa Azul Tamanho M"
          />
        </div>

        <div>
          <label htmlFor="item_2" className="block text-sm font-medium text-gray-700 mb-1">
            Item 2 (Opcional)
          </label>
          <input
            type="text"
            name="item_2"
            id="item_2"
            defaultValue={initialData?.item_2}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            placeholder="Ex: Livro 'Sapiens'"
          />
        </div>

        <div>
          <label htmlFor="item_3" className="block text-sm font-medium text-gray-700 mb-1">
            Item 3 (Opcional)
          </label>
          <input
            type="text"
            name="item_3"
            id="item_3"
            defaultValue={initialData?.item_3}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
            placeholder="Ex: Cartão Presente"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : initialData ? 'Atualizar Pedido' : 'Enviar Pedido 🎅'}
        </button>
      </div>
    </form>
  )
}
