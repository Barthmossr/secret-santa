import Link from 'next/link'

export function Header() {
  return (
    <header className="text-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-20 pointer-events-none"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 mb-4 drop-shadow-sm font-serif">
          Amigo Secreto 2025
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-light max-w-2xl mx-auto">
          Compartilhe seus desejos e faça este Ano Novo especial! 🎄✨
        </p>
      </div>
    </header>
  )
}
