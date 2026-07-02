'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { PromoForm } from '../../../../components/PromoForm'
import { useStore } from '../../../../lib/store'

export default function EditarPromoPage() {
  const { id } = useParams<{ id: string }>()
  const { promos } = useStore()
  const promo = promos.find((p) => p.id === id)

  if (!promo) {
    return (
      <div className="rounded-card bg-white p-8 text-center shadow-card">
        <p className="text-sm text-carbon/60">No encontramos esta promoción.</p>
        <Link
          href="/promociones"
          className="mt-4 inline-block font-semibold text-carbon underline"
        >
          Volver a mis promociones
        </Link>
      </div>
    )
  }

  return <PromoForm existing={promo} />
}
