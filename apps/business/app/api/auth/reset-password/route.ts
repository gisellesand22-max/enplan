import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || 'https://negocios.enplan.app'

    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: { redirectTo: `${origin}/reset-password` },
    })

    if (error) {
      if (error.message?.includes('User not found')) {
        return NextResponse.json({ success: true })
      }
      console.error('Reset link error:', error.message)
      return NextResponse.json({ error: 'Error generando enlace' }, { status: 500 })
    }

    const resetUrl = data?.properties?.action_link
    if (!resetUrl || !RESEND_API_KEY) {
      return NextResponse.json({ error: 'Error enviando email' }, { status: 500 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'enplan. <no-reply@enplan.app>',
        to: email,
        subject: 'Restablece tu contraseña — enplan.',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #2B2B23;">
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">
              Restablecer contraseña
            </h1>
            <p style="font-size: 15px; color: #2B2B23cc; margin: 0 0 28px;">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta en enplan. Haz clic en el botón para crear una nueva contraseña.
            </p>
            <a href="${resetUrl}" style="display: inline-block; background: #2B2B23; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              Restablecer contraseña
            </a>
            <p style="font-size: 13px; color: #2B2B2366; margin-top: 32px;">
              Si no solicitaste este cambio, puedes ignorar este correo. El enlace expira en 24 horas.
            </p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      console.error('Resend error:', await res.text())
      return NextResponse.json({ error: 'Error enviando email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
