import { createFileRoute, Link } from "@tanstack/react-router";
import { Share2, Ticket } from "lucide-react";
import { MobileShell } from "@/components/enplan/MobileShell";
import { useEnplanStore, type ActiveBenefit } from "@/lib/enplan-store";

export const Route = createFileRoute("/beneficios")({
  head: () => ({
    meta: [
      { title: "Mis beneficios — enplan." },
      { name: "description", content: "Tus códigos de beneficios activos y tu historial en enplan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BenefitsPage,
});

const bodyFont = { fontFamily: '"Work Sans", system-ui, sans-serif' as const };

function BenefitsPage() {
  const { user, benefits } = useEnplanStore();

  if (!user) {
    return (
      <MobileShell>
        <header className="px-5 pt-10 pb-2">
          <h1 className="font-display text-[22px] font-bold text-[#2B2B23]">Mis beneficios</h1>
        </header>
        <SignedOutState />
      </MobileShell>
    );
  }

  const now = Date.now();
  const active = benefits.filter((b) => b.status === "active" && b.expiresAt > now);
  const history = benefits.filter((b) => !(b.status === "active" && b.expiresAt > now));

  return (
    <MobileShell>
      <header className="px-5 pt-10 pb-4">
        <h1 className="font-display text-[22px] font-bold text-[#2B2B23]">Mis beneficios</h1>
      </header>

      <div className="flex gap-2 px-5 pb-5">
        <MetricPill text="3 usados este mes" />
        <MetricPill text="2 negocios visitados" />
      </div>

      <section className="px-5 pb-6">
        <h2 className="mb-3 font-display text-base font-bold text-[#2B2B23]">Activos</h2>
        {active.length === 0 ? (
          <ActivosEmpty />
        ) : (
          <div className="space-y-3">
            {active.map((b) => (
              <ActivoCard key={b.id} benefit={b} />
            ))}
          </div>
        )}
      </section>

      <section className="px-5 pb-10">
        <h2 className="mb-3 font-display text-base font-bold text-[#2B2B23]">Historial</h2>
        {history.length === 0 ? (
          <p className="rounded-2xl bg-white p-5 text-center text-sm text-[#2B2B23]/50 shadow-sm" style={bodyFont}>
            Aún no tienes beneficios usados
          </p>
        ) : (
          <div className="space-y-2">
            {history.map((b) => <HistorialCard key={b.id} benefit={b} />)}
          </div>
        )}
      </section>
    </MobileShell>
  );
}

function MetricPill({ text }: { text: string }) {
  return (
    <span
      className="rounded-[12px] bg-[#CDD917] px-5 py-3 font-display font-bold text-[#2B2B23]"
      style={{ fontSize: "13px" }}
    >
      {text}
    </span>
  );
}

function ActivoCard({ benefit }: { benefit: ActiveBenefit }) {
  const share = async () => {
    const text = `Mi código enplan. para ${benefit.businessName}: ${benefit.code}`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: "enplan.", text });
      } catch {}
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6D0C4] text-[10px] text-[#2B2B23]/50">
          Logo
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold text-[#2B2B23]">
            {benefit.businessName}
          </p>
        </div>
        <span
          className="rounded-full bg-[#CDD917] px-2 py-0.5 text-[11px] font-bold text-[#2B2B23]"
          style={bodyFont}
        >
          {benefit.promoType}
        </span>
      </div>
      <p className="mt-3 text-sm text-[#2B2B23]" style={bodyFont}>
        {benefit.promoTitle}
      </p>
      <div className="mt-4 flex justify-center">
        <div className="rounded-lg border-2 border-[#CDD917] bg-white px-6 py-3">
          <p className="font-display text-5xl font-bold tracking-widest text-[#2B2B23]">
            {benefit.code}
          </p>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#D6D0C4]" style={bodyFont}>
        Expira en 18h 42m
      </p>
      <button
        type="button"
        onClick={share}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-[#2B2B23] transition-colors hover:bg-[#FAF8F3]"
        style={bodyFont}
      >
        <Share2 size={16} /> Compartir con amigos
      </button>
    </div>
  );
}

function HistorialCard({ benefit }: { benefit: ActiveBenefit }) {
  const d = new Date(benefit.activatedAt);
  const date = d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isUsed = benefit.status === "used";
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm">
      <div className="min-w-0">
        <p className="truncate font-display text-[13px] font-bold text-[#2B2B23]">
          {benefit.businessName}
        </p>
        <p className="truncate text-[13px] text-[#2B2B23]/70" style={bodyFont}>
          {benefit.promoTitle}
        </p>
        <p className="text-xs text-[#2B2B23]/50" style={bodyFont}>{date}</p>
      </div>
      {isUsed && (
        <span
          className="shrink-0 rounded-full bg-[#D1FAE5] px-2.5 py-1 font-bold text-[#059669]"
          style={{ ...bodyFont, fontSize: "12px" }}
        >
          Usado
        </span>
      )}
    </div>
  );
}

function ActivosEmpty() {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
      <Ticket size={48} className="mx-auto text-[#D6D0C4]" />
      <p className="mt-4 font-display text-base font-bold text-[#2B2B23]">
        Aún no tienes beneficios activos
      </p>
      <p className="mt-1 text-sm text-[#2B2B23]/60" style={bodyFont}>
        Explora negocios en Inicio y activa tu primer beneficio
      </p>
      <Link
        to="/"
        className="mt-5 inline-block rounded-full bg-[#CDD917] px-6 py-2.5 font-display text-sm font-bold text-[#2B2B23]"
      >
        Explorar
      </Link>
    </div>
  );
}

function SignedOutState() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 pt-16">
      <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#CDD917]/30">
          <Ticket className="text-[#2B2B23]" />
        </div>
        <p className="mt-4 font-display text-base font-bold text-[#2B2B23]">
          Inicia sesión para ver tus beneficios
        </p>
        <Link
          to="/login"
          className="mt-5 inline-block rounded-full bg-[#CDD917] px-6 py-2.5 font-display text-sm font-bold text-[#2B2B23]"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
