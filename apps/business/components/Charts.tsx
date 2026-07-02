'use client'

export type Point = { label: string; value: number }

/** Lightweight SVG area+line chart, on-brand, no dependencies. */
export function AreaChart({ data }: { data: Point[] }) {
  const W = 320
  const H = 168
  const padX = 10
  const padTop = 16
  const padBottom = 22
  const n = data.length
  const max = Math.max(...data.map((d) => d.value), 1)
  const innerW = W - padX * 2
  const innerH = H - padTop - padBottom

  const x = (i: number) => (n <= 1 ? W / 2 : padX + (i * innerW) / (n - 1))
  const y = (v: number) => padTop + innerH - (v / max) * innerH

  const line = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`)
    .join(' ')
  const area = `${line} L${x(n - 1).toFixed(1)},${(padTop + innerH).toFixed(1)} L${x(0).toFixed(
    1,
  )},${(padTop + innerH).toFixed(1)} Z`

  const grid = [0, 0.5, 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CDD917" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#CDD917" stopOpacity="0" />
        </linearGradient>
      </defs>

      {grid.map((g, i) => {
        const gy = padTop + innerH - g * innerH
        return (
          <g key={i}>
            <line
              x1={padX}
              x2={W - padX}
              y1={gy}
              y2={gy}
              stroke="#D6D0C4"
              strokeWidth="0.5"
              strokeDasharray="2 3"
            />
            <text x={padX} y={gy - 2} fontSize="7" fill="#B8B8B0">
              {Math.round(max * g)}
            </text>
          </g>
        )
      })}

      <path d={area} fill="url(#areaFill)" />
      <path
        d={line}
        fill="none"
        stroke="#7B820E"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {data.map((d, i) =>
        i === n - 1 ? (
          <g key={`dot-${i}`}>
            <circle cx={x(i)} cy={y(d.value)} r="4" fill="#2B2B23" />
            <circle cx={x(i)} cy={y(d.value)} r="7" fill="#2B2B23" fillOpacity="0.12" />
          </g>
        ) : null,
      )}

      {data.map((d, i) =>
        n <= 7 || i % 2 === 0 || i === n - 1 ? (
          <text key={`lbl-${i}`} x={x(i)} y={H - 6} textAnchor="middle" fontSize="7" fill="#9A978F">
            {d.label}
          </text>
        ) : null,
      )}
    </svg>
  )
}

export type Segment = { label: string; value: number; color: string }

/** Donut chart with legend, for proportion breakdowns. */
export function Donut({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const R = 52
  const C = 2 * Math.PI * R
  const sw = 20
  let offset = 0

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 140 140" className="h-32 w-32 shrink-0 -rotate-90">
        <circle cx="70" cy="70" r={R} fill="none" stroke="#EBEBEA" strokeWidth={sw} />
        {segments.map((s, i) => {
          const dash = (s.value / total) * C
          const el = (
            <circle
              key={i}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={sw}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          )
          offset += dash
          return el
        })}
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
            <span className="text-carbon/70">{s.label}</span>
            <span className="font-montserrat font-bold text-carbon">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Simple vertical bar chart. */
export function BarChart({ data }: { data: Point[] }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex items-end gap-2" style={{ height: 150 }}>
      {data.map((d, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
          <span className="text-[10px] font-semibold text-carbon/60">{d.value}</span>
          <div
            className="w-full rounded-t-md bg-lima"
            style={{ height: `${Math.max(4, (d.value / max) * 108)}px` }}
          />
          <span className="text-[10px] text-carbon/50">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
