import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-carbon text-white/80 py-12 px-6 md:px-8">
      <div className="container-landing mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-montserrat font-extrabold text-2xl text-white mb-2">enplan.</p>
            <p className="text-sm text-white/50">Beneficios locales, verificados y reales.</p>
          </div>

          <div className="flex gap-12">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Plataforma</p>
              <Link href="/" className="block text-sm hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/become-a-partner" className="block text-sm hover:text-white transition-colors">
                Para Negocios
              </Link>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Legal</p>
              <p className="text-sm text-white/50">Privacidad</p>
              <p className="text-sm text-white/50">Términos</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} enplan. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/40">Hecho en Aguascalientes 🇲🇽</p>
        </div>
      </div>
    </footer>
  )
}
