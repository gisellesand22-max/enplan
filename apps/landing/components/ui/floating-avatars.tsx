'use client'

import { User } from 'lucide-react'

const avatars = [
  { color: '#CDD917', top: '6%', left: '10%', size: 72 },
  { color: '#7BAFD4', top: '4%', left: '38%', size: 60 },
  { color: '#F2A0B0', top: '8%', right: '8%', size: 72 },
  { color: '#C4A0D4', top: '30%', left: '3%', size: 64 },
  { color: '#E8A080', top: '35%', right: '5%', size: 72 },
  { color: '#A0D4A0', bottom: '30%', left: '6%', size: 60 },
  { color: '#E8C840', bottom: '22%', left: '25%', size: 56 },
  { color: '#CDD917', bottom: '28%', right: '10%', size: 64 },
  { color: '#7BAFD4', bottom: '8%', right: '22%', size: 72 },
  { color: '#F2A0B0', bottom: '6%', left: '40%', size: 56 },
]

interface FloatingAvatarsProps {
  title: string
  description: string
  ctaText: string
  ctaHref: string
}

export function FloatingAvatars({ title, description, ctaText, ctaHref }: FloatingAvatarsProps) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#2B2B23', padding: '7rem 1.5rem', minHeight: '600px' }}>
      {avatars.map((av, i) => (
        <div
          key={i}
          className="animate-float"
          style={{
            position: 'absolute',
            top: av.top,
            left: av.left,
            right: av.right,
            bottom: av.bottom,
            width: av.size,
            height: av.size,
            backgroundColor: av.color,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${av.color}66`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            animationDelay: `${i * 350}ms`,
            animationDuration: `${5 + (i % 4)}s`,
            zIndex: 1,
          }}
        >
          <User color="white" size={av.size * 0.35} strokeWidth={2.5} />
        </div>
      ))}

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
          {title}
        </h2>
        <p className="text-white/40 max-w-lg mx-auto mb-10 text-base md:text-lg">
          {description}
        </p>
        <a
          href={ctaHref}
          className="bg-white text-carbon font-bold px-10 py-4 rounded-full text-lg hover:bg-arena transition-colors inline-flex items-center gap-2 shadow-lg"
        >
          {ctaText}
        </a>
      </div>
    </section>
  )
}
