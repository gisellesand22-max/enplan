'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  IconTrendingUp,
  IconCalendarStats,
  IconUsers,
  IconTicket,
  IconLock,
  IconCrown,
  IconGenderBigender,
  IconCake,
  IconUserPlus,
  IconClock,
  IconTrophy,
  IconRepeat,
  IconBulb,
  IconFileTypePdf,
  IconFileSpreadsheet,
} from '@tabler/icons-react'
import { AreaChart, BarChart, Donut } from '../../../components/Charts'
import { useStore } from '../../../lib/store'
import {
  buildDailySeries,
  buildMonthlySeries,
  buildPromoPerformance,
  WEEKDAY_VISITS,
  GENDER_SPLIT,
  AGE_SPLIT,
  RETURNING_SPLIT,
  HOURLY_VISITS,
  RETENTION_RATE,
  CATEGORY_RANK,
  INSIGHTS,
} from '../../../lib/demo'

type Range = 'dia' | 'mes'

export default function MetricasPage() {
  const { negocio } = useStore()
  const [range, setRange] = useState<Range>('mes')

  // Básico: no metrics access.
  if (negocio.plan === 'basico') return <LockedMetrics />

  const series = range === 'dia' ? buildDailySeries() : buildMonthlySeries()
  const total = series.reduce((s, p) => s + p.value, 0)
  const last = series[series.length - 1]?.value ?? 0
  const prev = series[series.length - 2]?.value ?? 0
  const growth = prev > 0 ? Math.round(((last - prev) / prev) * 100) : 0
  const best = series.reduce((a, b) => (b.value > a!.value ? b : a), series[0])!

  const summary = [
    { label: range === 'dia' ? 'Visitas (14 días)' : 'Visitas (6 meses)', value: `${total}`, icon: IconUsers },
    { label: range === 'dia' ? 'Mejor día' : 'Mejor mes', value: `${best.value}`, sub: best.label, icon: IconCalendarStats },
    { label: range === 'dia' ? 'vs día previo' : 'vs mes previo', value: `${growth >= 0 ? '+' : ''}${growth}%`, icon: IconTrendingUp, accent: growth >= 0 },
    { label: 'Promedio', value: `${Math.round(total / series.length)}`, icon: IconTicket },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-montserrat text-2xl font-extrabold">Métricas</h1>
        <p className="text-sm text-carbon/60">Cómo crece tu negocio con enplan.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summary.map((m) => (
          <div key={m.label} className="rounded-card bg-white p-4 shadow-card">
            <m.icon size={18} className={m.accent === false ? 'text-red-500' : 'text-lima-700'} />
            <div className="mt-2 font-montserrat text-2xl font-extrabold leading-none">{m.value}</div>
            <div className="mt-1 text-xs font-medium text-carbon/50">
              {m.label}
              {m.sub ? ` · ${m.sub}` : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Growth chart */}
      <div className="rounded-card bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-montserrat text-lg font-bold">Crecimiento de visitas</h2>
            <p className="text-sm text-carbon/50">
              {range === 'dia' ? 'Últimos 14 días' : 'Últimos 6 meses'}
            </p>
          </div>
          <div className="flex rounded-chip bg-arena p-1">
            {(['dia', 'mes'] as Range[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`rounded-chip px-3 py-1.5 text-sm font-semibold transition-colors ${
                  range === r ? 'bg-carbon text-white' : 'text-carbon/60'
                }`}
              >
                {r === 'dia' ? 'Día' : 'Mes'}
              </button>
            ))}
          </div>
        </div>
        <AreaChart data={series} />
      </div>

      {/* Weekday distribution */}
      <div className="rounded-card bg-white p-5 shadow-card">
        <h2 className="font-montserrat text-lg font-bold">Visitas por día de la semana</h2>
        <p className="mb-4 text-sm text-carbon/50">Tu mejor día para promover ofertas</p>
        <BarChart data={WEEKDAY_VISITS} />
      </div>

      {/* Premium: advanced audience demographics */}
      {negocio.plan === 'premium' ? <AdvancedMetrics /> : <PremiumTeaser />}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <h2 className="font-montserrat text-lg font-bold">{children}</h2>
      <span className="inline-flex items-center gap-1 rounded-full bg-carbon px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lima">
        <IconCrown size={12} /> Premium
      </span>
    </div>
  )
}

function AdvancedMetrics() {
  const { promos } = useStore()
  const perf = buildPromoPerformance(promos)
  const rankMax = Math.max(...CATEGORY_RANK.leaders.map((l) => l.visitas), 1)

  return (
    <div className="flex flex-col gap-4">
      {/* Export */}
      <div className="flex items-center justify-between">
        <SectionTitle>Tu público</SectionTitle>
        <div className="hidden gap-2 sm:flex">
          <ExportButtons />
        </div>
      </div>
      <div className="flex gap-2 sm:hidden">
        <ExportButtons />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-card bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <IconGenderBigender size={18} className="text-lima-700" />
            <h3 className="font-montserrat font-bold">Sexo</h3>
          </div>
          <Donut segments={GENDER_SPLIT} />
        </div>
        <div className="rounded-card bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <IconUserPlus size={18} className="text-lima-700" />
            <h3 className="font-montserrat font-bold">Nuevos vs recurrentes</h3>
          </div>
          <Donut segments={RETURNING_SPLIT} />
        </div>
      </div>

      <div className="rounded-card bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <IconCake size={18} className="text-lima-700" />
          <h3 className="font-montserrat font-bold">Edad de tu público</h3>
        </div>
        <BarChart data={AGE_SPLIT} />
      </div>

      {/* Behavior */}
      <SectionTitle>Comportamiento</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-card bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <IconClock size={18} className="text-lima-700" />
            <h3 className="font-montserrat font-bold">Horas pico</h3>
          </div>
          <BarChart data={HOURLY_VISITS} />
        </div>
        <div className="flex flex-col rounded-card bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <IconRepeat size={18} className="text-lima-700" />
            <h3 className="font-montserrat font-bold">Tasa de retorno</h3>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="font-montserrat text-5xl font-extrabold text-carbon">
              {RETENTION_RATE}%
            </div>
            <p className="mt-1 text-sm text-carbon/60">
              de tus clientes vuelven en los últimos 30 días
            </p>
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-arena-dark/40">
              <div className="h-full rounded-full bg-lima" style={{ width: `${RETENTION_RATE}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Performance */}
      <SectionTitle>Rendimiento</SectionTitle>

      {/* Category ranking */}
      <div className="rounded-card bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <IconTrophy size={18} className="text-lima-700" />
          <h3 className="font-montserrat font-bold">Tu ranking</h3>
        </div>
        <div className="mb-4 flex items-baseline gap-2">
          <span className="font-montserrat text-4xl font-extrabold text-carbon">
            #{CATEGORY_RANK.position}
          </span>
          <span className="text-sm text-carbon/60">
            de {CATEGORY_RANK.total} {CATEGORY_RANK.categoria} en {CATEGORY_RANK.ciudad}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {CATEGORY_RANK.leaders.map((l, i) => (
            <div
              key={l.name}
              className={`flex items-center gap-3 rounded-card px-3 py-2 ${
                l.isYou ? 'bg-lima/15' : ''
              }`}
            >
              <span className="w-5 font-montserrat text-sm font-bold text-carbon/50">{i + 1}</span>
              <span className={`flex-1 text-sm ${l.isYou ? 'font-bold text-carbon' : 'text-carbon/70'}`}>
                {l.name} {l.isYou && <span className="text-lima-700">· tú</span>}
              </span>
              <div className="hidden h-2 w-28 overflow-hidden rounded-full bg-arena-dark/40 sm:block">
                <div
                  className={l.isYou ? 'h-full bg-lima' : 'h-full bg-carbon/30'}
                  style={{ width: `${(l.visitas / rankMax) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm font-semibold text-carbon">{l.visitas}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-promo performance */}
      <div className="rounded-card bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <IconTicket size={18} className="text-lima-700" />
          <h3 className="font-montserrat font-bold">Rendimiento por promoción</h3>
        </div>
        {perf.length === 0 ? (
          <p className="text-sm text-carbon/50">Aún no tienes promociones con datos.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {perf.map((p) => (
              <div key={p.titulo}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-carbon">{p.titulo}</span>
                  <span className="shrink-0 text-xs text-carbon/50">
                    {p.validadas}/{p.activaciones} · {p.conv}% conv.
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-arena-dark/40">
                  <div className="h-full rounded-full bg-lima" style={{ width: `${p.conv}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Insights */}
      <SectionTitle>Insights</SectionTitle>
      <div className="flex flex-col gap-2">
        {INSIGHTS.map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-card border-l-4 border-lima bg-white p-4 shadow-card"
          >
            <IconBulb size={20} className="mt-0.5 shrink-0 text-lima-700" />
            <p className="text-sm text-carbon/80">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExportButtons() {
  return (
    <>
      <button
        type="button"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-chip border border-arena-dark bg-white px-3 py-2 text-sm font-semibold text-carbon hover:bg-arena sm:flex-none"
      >
        <IconFileTypePdf size={16} /> PDF
      </button>
      <button
        type="button"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-chip border border-arena-dark bg-white px-3 py-2 text-sm font-semibold text-carbon hover:bg-arena sm:flex-none"
      >
        <IconFileSpreadsheet size={16} /> Excel
      </button>
    </>
  )
}

function PremiumTeaser() {
  return (
    <div className="relative overflow-hidden rounded-card border border-carbon/10 bg-white p-6 shadow-card">
      <div className="pointer-events-none absolute inset-0 flex items-end gap-2 p-6 opacity-[0.07]">
        {[40, 70, 55, 90, 60].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-carbon" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="relative">
        <span className="inline-flex items-center gap-1 rounded-full bg-carbon px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lima">
          <IconCrown size={12} /> Premium
        </span>
        <h3 className="mt-3 font-montserrat text-lg font-bold">Conoce a tu público a fondo</h3>
        <p className="mt-1 max-w-md text-sm text-carbon/60">
          Sube a Premium y descubre el <b>sexo</b>, la <b>edad</b> y cuántos clientes son
          <b> nuevos vs recurrentes</b>. Toma mejores decisiones sobre qué promociones lanzar y a quién.
        </p>
        <Link
          href="/perfil"
          className="mt-4 inline-flex items-center gap-1.5 rounded-chip bg-carbon px-4 py-2 text-sm font-semibold text-white"
        >
          <IconCrown size={16} /> Subir a Premium
        </Link>
      </div>
    </div>
  )
}

/** Wraps a chart card, showing it blurred with a padlock overlay. */
function Locked({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-card">
      <div className="pointer-events-none select-none opacity-70 blur-[3px]">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/20">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-carbon text-white shadow-card">
          <IconLock size={20} />
        </span>
      </div>
    </div>
  )
}

function LockedMetrics() {
  const monthly = buildMonthlySeries()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-montserrat text-2xl font-extrabold">Métricas</h1>
        <p className="text-sm text-carbon/60">Mide el crecimiento de tu negocio.</p>
      </div>

      {/* Upsell banner */}
      <div className="rounded-card bg-carbon p-5 text-white">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lima text-carbon">
              <IconLock size={20} />
            </span>
            <div>
              <p className="font-montserrat font-bold">Tus métricas están bloqueadas</p>
              <p className="text-sm text-white/60">
                Con el plan Básico ves tu panel de inicio. Sube de plan para desbloquear estas
                gráficas.
              </p>
            </div>
          </div>
          <Link
            href="/perfil"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-chip bg-lima px-5 py-2.5 text-sm font-semibold text-carbon"
          >
            <IconCrown size={16} /> Ver planes
          </Link>
        </div>
      </div>

      {/* Locked previews of the real charts */}
      <Locked>
        <div className="rounded-card bg-white p-5 shadow-card">
          <h2 className="mb-1 font-montserrat text-lg font-bold">Crecimiento de visitas</h2>
          <p className="mb-4 text-sm text-carbon/50">Últimos 6 meses</p>
          <AreaChart data={monthly} />
        </div>
      </Locked>

      <Locked>
        <div className="rounded-card bg-white p-5 shadow-card">
          <h2 className="mb-1 font-montserrat text-lg font-bold">Visitas por día de la semana</h2>
          <p className="mb-4 text-sm text-carbon/50">Tu mejor día para promover</p>
          <BarChart data={WEEKDAY_VISITS} />
        </div>
      </Locked>

      <div className="grid gap-5 sm:grid-cols-2">
        <Locked>
          <div className="rounded-card bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <IconGenderBigender size={18} className="text-lima-700" />
              <h3 className="font-montserrat font-bold">Sexo</h3>
            </div>
            <Donut segments={GENDER_SPLIT} />
          </div>
        </Locked>
        <Locked>
          <div className="rounded-card bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <IconClock size={18} className="text-lima-700" />
              <h3 className="font-montserrat font-bold">Horas pico</h3>
            </div>
            <BarChart data={HOURLY_VISITS} />
          </div>
        </Locked>
      </div>

      <Locked>
        <div className="rounded-card bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <IconCake size={18} className="text-lima-700" />
            <h3 className="font-montserrat font-bold">Edad de tu público</h3>
          </div>
          <BarChart data={AGE_SPLIT} />
        </div>
      </Locked>
    </div>
  )
}
