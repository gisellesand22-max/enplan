'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconMenu2, IconX } from '@tabler/icons-react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-arena/80 backdrop-blur-md border-b border-arena-dark/30">
      <div className="container-landing mx-auto flex items-center justify-between h-16">
        <Link href="/" className="font-montserrat font-extrabold text-2xl text-carbon tracking-tight">
          enplan.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-carbon/70 hover:text-carbon transition-colors">
            Inicio
          </Link>
          <Link href="/become-a-partner" className="text-sm font-medium text-carbon/70 hover:text-carbon transition-colors">
            Para Negocios
          </Link>
          <Link
            href="/become-a-partner"
            className="bg-lima text-carbon font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-lima-400 transition-colors"
          >
            Únete como socio
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-arena border-t border-arena-dark/30 px-6 py-4 space-y-3">
          <Link href="/" onClick={() => setOpen(false)} className="block text-sm font-medium text-carbon/70">
            Inicio
          </Link>
          <Link href="/become-a-partner" onClick={() => setOpen(false)} className="block text-sm font-medium text-carbon/70">
            Para Negocios
          </Link>
          <Link
            href="/become-a-partner"
            onClick={() => setOpen(false)}
            className="block bg-lima text-carbon font-semibold text-sm px-5 py-2.5 rounded-full text-center"
          >
            Únete como socio
          </Link>
        </div>
      )}
    </nav>
  )
}
