'use client'

import { useState } from 'react'
import { IconScan } from '@tabler/icons-react'
import { Button, ValidationResult } from '@enplan/ui'
import { validarCodigoDemo } from '../../../lib/demo'

type Result = ReturnType<typeof validarCodigoDemo>

export default function ValidarPage() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  function handleValidate(e: React.FormEvent) {
    e.preventDefault()
    if (code.length < 4) return
    setResult(validarCodigoDemo(code))
  }

  function reset() {
    setCode('')
    setResult(null)
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5">
      <div>
        <h1 className="font-montserrat text-2xl font-extrabold">Validar código</h1>
        <p className="text-sm text-carbon/60">
          Opcional. Si tu cliente activó una promo, ingresa su código de 4 dígitos para
          registrar la visita.
        </p>
      </div>

      {result ? (
        <div className="flex flex-col gap-4">
          <ValidationResult
            result={
              result.status === 'success'
                ? {
                    status: 'success',
                    customerName: result.customerName,
                    promoTitle: result.promoTitle,
                  }
                : { status: 'error', reason: result.reason }
            }
          />
          <Button variant="outline" fullWidth onClick={reset}>
            Validar otro código
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleValidate}
          className="flex flex-col items-center gap-6 rounded-card bg-white p-8 shadow-card"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lima/15 text-lima-700">
            <IconScan size={26} />
          </span>
          <input
            inputMode="numeric"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="0000"
            className="w-full rounded-card border border-arena-dark bg-arena px-6 py-4 text-center font-montserrat text-4xl font-bold tracking-[0.4em] text-carbon outline-none placeholder:text-carbon/30 focus:border-carbon focus:ring-1 focus:ring-carbon"
          />
          <Button type="submit" fullWidth disabled={code.length < 4}>
            Validar
          </Button>
          <p className="text-center text-xs text-carbon/40">
            Demo: prueba <b className="text-carbon/60">1234</b> (válido),{' '}
            <b className="text-carbon/60">0000</b> (usado) o cualquier otro (inválido).
          </p>
        </form>
      )}
    </div>
  )
}
