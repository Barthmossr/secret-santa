'use client'

import Link from 'next/link'
import { Request } from '@/types'
import { isOwnedRequest } from '@/lib/requestOwnership'

interface RequestCardProps {
  request: Request
}

export function RequestCard({ request }: RequestCardProps) {
  const isOwned = isOwnedRequest(request.id)

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-red-800 group-hover:text-red-600 transition-colors">
          {request.name}
        </h3>
        {isOwned && (
          <Link
            href={`/edit/${request.id}`}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1 rounded-full hover:bg-red-50"
          >
            ✏️ Editar
          </Link>
        )}
      </div>
      
      <ul className="space-y-3">
        <li className="flex items-start gap-2 text-gray-700">
          <span className="text-red-500 mt-1">🎁</span>
          <span>{request.item_1}</span>
        </li>
        {request.item_2 && (
          <li className="flex items-start gap-2 text-gray-700">
            <span className="text-green-500 mt-1">🎄</span>
            <span>{request.item_2}</span>
          </li>
        )}
        {request.item_3 && (
          <li className="flex items-start gap-2 text-gray-700">
            <span className="text-yellow-500 mt-1">⭐</span>
            <span>{request.item_3}</span>
          </li>
        )}
      </ul>
      
      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
        <span>Atualizado: {new Date(request.updated_at).toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
  )
}
