import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFY_EMAIL = 'hola@enplan.app'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { negocio, contacto, email, telefono, categoria, mensaje } = body

    if (!negocio || !contacto || !email || !categoria) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    let dbOk = false
    let emailOk = false

    if (SUPABASE_URL && SUPABASE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
      const { error } = await supabase.from('leads').insert({
        negocio,
        contacto,
        email,
        telefono: telefono || null,
        categoria,
        mensaje: mensaje || null,
      })
      if (error) {
        console.error('Supabase error:', error)
      } else {
        dbOk = true
      }
    }

    if (RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'enplan. <noreply@enplan.app>',
            to: NOTIFY_EMAIL,
            subject: `Nuevo lead: ${negocio} (${categoria})`,
            html: `
              <div style="font-family:system-ui,sans-serif;max-width:500px">
                <h2 style="color:#3C3B1E">Nueva solicitud de socio</h2>
                <table style="border-collapse:collapse;width:100%">
                  <tr><td style="padding:8px 12px;font-weight:600;color:#3C3B1E">Negocio</td><td style="padding:8px 12px">${negocio}</td></tr>
                  <tr style="background:#f9f8f3"><td style="padding:8px 12px;font-weight:600;color:#3C3B1E">Contacto</td><td style="padding:8px 12px">${contacto}</td></tr>
                  <tr><td style="padding:8px 12px;font-weight:600;color:#3C3B1E">Email</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
                  <tr style="background:#f9f8f3"><td style="padding:8px 12px;font-weight:600;color:#3C3B1E">Teléfono</td><td style="padding:8px 12px">${telefono || '—'}</td></tr>
                  <tr><td style="padding:8px 12px;font-weight:600;color:#3C3B1E">Categoría</td><td style="padding:8px 12px">${categoria}</td></tr>
                  <tr style="background:#f9f8f3"><td style="padding:8px 12px;font-weight:600;color:#3C3B1E">Mensaje</td><td style="padding:8px 12px">${mensaje || '—'}</td></tr>
                </table>
              </div>
            `,
          }),
        })
        emailOk = res.ok
        if (!res.ok) console.error('Resend error:', await res.text())
      } catch (err) {
        console.error('Resend error:', err)
      }
    }

    if (!dbOk && !emailOk) {
      console.error('Lead no guardado ni enviado:', { negocio, contacto, email, categoria })
      return NextResponse.json({ error: 'Error procesando solicitud' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
