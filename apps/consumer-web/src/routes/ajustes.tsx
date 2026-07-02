import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/enplan/MobileShell";
import { enplanActions, useEnplanStore } from "@/lib/enplan-store";

export const Route = createFileRoute("/ajustes")({
  head: () => ({
    meta: [
      { title: "Ajustes — enplan." },
      { name: "description", content: "Configura tu cuenta enplan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AjustesPage,
});

type Toggle = { key: string; title: string; subtitle: string; default: boolean };

const TOGGLES: Toggle[] = [
  {
    key: "nuevos",
    title: "Nuevos beneficios cerca",
    subtitle: "Te avisamos cuando un negocio agrega una promo",
    default: true,
  },
  {
    key: "vencer",
    title: "Mis códigos por vencer",
    subtitle: "Recuerda usar tus beneficios antes de que expiren",
    default: true,
  },
  {
    key: "premium",
    title: "Ofertas exclusivas Premium",
    subtitle: "Acceso anticipado a promos especiales",
    default: true,
  },
  {
    key: "novedades",
    title: "Novedades de enplan.",
    subtitle: "Actualizaciones y anuncios del equipo",
    default: false,
  },
];

function AjustesPage() {
  const { user } = useEnplanStore();
  const navigate = useNavigate();
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(TOGGLES.map((t) => [t.key, t.default])),
  );

  const plan = "Gratis";

  const onLogout = () => {
    if (typeof window !== "undefined" && !window.confirm("¿Cerrar sesión en enplan.?")) return;
    enplanActions.logout();
    navigate({ to: "/" });
  };

  return (
    <MobileShell>
      <header className="px-5 pt-10 pb-4">
        <h1 className="font-display text-[26px] font-bold text-[#2B2B23]">Ajustes</h1>
      </header>

      <Section title="Cuenta">
        <Row title="Editar nombre" onClick={() => alert("Editar nombre")} />
        <Row title="Cambiar email" onClick={() => alert("Cambiar email")} />
      </Section>

      <Section title="Notificaciones">
        {TOGGLES.map((t) => (
          <ToggleRow
            key={t.key}
            title={t.title}
            subtitle={t.subtitle}
            value={toggles[t.key]}
            onChange={(v) => setToggles((p) => ({ ...p, [t.key]: v }))}
          />
        ))}
      </Section>

      <Section title="Plan">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm text-[#2B2B23]" style={bodyFont}>Plan actual</span>
          <span className="rounded-full bg-[#CDD917] px-3 py-1 font-display text-xs font-bold text-[#2B2B23]">
            {plan}
          </span>
        </div>
      </Section>

      <Section title="Acerca de">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-sm text-[#2B2B23]" style={bodyFont}>Versión</span>
          <span className="text-sm text-[#2B2B23]/60" style={bodyFont}>1.0.0</span>
        </div>
        <Row title="Términos y condiciones" onClick={() => alert("Términos y condiciones")} />
        <Row title="Política de privacidad" onClick={() => alert("Política de privacidad")} />
      </Section>

      <div className="px-5 pt-2 pb-10">
        {user ? (
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-2xl bg-white py-4 text-center font-display text-sm font-bold text-[#E04848] shadow-sm"
          >
            Cerrar sesión
          </button>
        ) : (
          <p className="text-center text-xs text-[#2B2B23]/40" style={bodyFont}>
            No has iniciado sesión
          </p>
        )}
      </div>
    </MobileShell>
  );
}

const bodyFont = { fontFamily: '"Work Sans", system-ui, sans-serif' as const };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 pb-5">
      <h2 className="mb-2 px-1 font-display text-[13px] font-bold uppercase tracking-wider text-[#2B2B23]/60">
        {title}
      </h2>
      <div className="divide-y divide-[#D6D0C4]/60 overflow-hidden rounded-2xl bg-white shadow-sm">
        {children}
      </div>
    </section>
  );
}

function Row({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-[#FAF8F3]"
    >
      <span className="text-sm text-[#2B2B23]" style={bodyFont}>{title}</span>
      <span className="text-[#2B2B23]/30">›</span>
    </button>
  );
}

function ToggleRow({
  title,
  subtitle,
  value,
  onChange,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#2B2B23]" style={bodyFont}>{title}</p>
        <p className="mt-0.5 text-xs text-[#2B2B23]/55" style={bodyFont}>{subtitle}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors"
        style={{ backgroundColor: value ? "#CDD917" : "#D6D0C4" }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
          style={{ left: value ? "22px" : "2px" }}
        />
      </button>
    </div>
  );
}
