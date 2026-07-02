import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Clock, Share2 } from "lucide-react";
import { BUSINESSES } from "@/lib/enplan-data";
import {
  enplanActions,
  formatCountdown,
  useEnplanStore,
  type ActiveBenefit,
} from "@/lib/enplan-store";
import { MobileShell, Logo } from "@/components/enplan/MobileShell";

export const Route = createFileRoute("/business/$businessId/activate/$promoId")({
  head: () => ({
    meta: [
      { title: "Beneficio activado — enplan." },
      { name: "description", content: "Tu código de beneficio enplan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => {
    const business = BUSINESSES.find((b) => b.id === params.businessId);
    if (!business) throw notFound();
    const promo = business.promos.find((p) => p.id === params.promoId);
    if (!promo) throw notFound();
    return { business, promo };
  },
  notFoundComponent: () => (
    <MobileShell showNav={false}>
      <div className="flex min-h-screen items-center justify-center px-6 text-center text-sm">
        Beneficio no disponible.{" "}
        <Link to="/" className="ml-2 underline">
          Volver
        </Link>
      </div>
    </MobileShell>
  ),
  errorComponent: ({ reset }) => (
    <MobileShell showNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-lg font-bold">Algo salió mal</p>
        <button
          onClick={reset}
          className="mt-4 rounded-full bg-[#CDD917] px-5 py-2 text-sm font-semibold text-[#2B2B23]"
        >
          Reintentar
        </button>
      </div>
    </MobileShell>
  ),
  component: ActivatePage,
});

function ActivatePage() {
  const { business, promo } = Route.useLoaderData();
  const { user } = useEnplanStore();
  const navigate = useNavigate();
  const [benefit, setBenefit] = useState<ActiveBenefit | null>(null);

  // Los hooks SIEMPRE se declaran arriba, nunca dentro de un if —
  // el hook condicional anterior podía crashear la app al azar.
  useEffect(() => {
    if (!user) {
      navigate({
        to: "/login",
        search: { next: `/business/${business.id}/activate/${promo.id}` },
        replace: true,
      });
      return;
    }
    const b = enplanActions.activate({
      businessId: business.id,
      businessName: business.name,
      promoType: promo.type,
      promoTitle: promo.title,
    });
    setBenefit(b);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  if (!benefit) {
    return (
      <MobileShell showNav={false}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#CDD917] border-t-transparent" />
        </div>
      </MobileShell>
    );
  }

  return <ActivatedView benefit={benefit} />;
}

export function ActivatedView({ benefit }: { benefit: ActiveBenefit }) {
  const [, force] = useState(0);
  useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  const first = benefit.code.slice(0, 2);
  const last = benefit.code.slice(2);
  const remaining = useMemo(() => formatCountdown(benefit.expiresAt), [benefit.expiresAt]);

  const share = async () => {
    const text = `Activé "${benefit.promoTitle}" en ${benefit.businessName} con enplan.`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: "enplan.", text });
      } catch {}
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <MobileShell showNav={false}>
      <header className="flex items-center justify-between px-5 pt-10">
        <Logo />
        <Link to="/" className="text-xs font-medium text-[#2B2B23]/60">
          Cerrar
        </Link>
      </header>

      <div className="flex flex-col items-center px-6 pt-8 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#CDD917]">
          <Check size={40} strokeWidth={3} className="text-[#2B2B23]" />
          <span className="absolute inset-0 animate-ping rounded-full bg-[#CDD917]/40" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-[#2B2B23]">
          ¡Beneficio activado!
        </h1>
        <p className="mt-1 text-sm text-[#2B2B23]/60">{benefit.businessName}</p>
        <p className="mt-1 text-sm font-medium text-[#2B2B23]">{benefit.promoTitle}</p>

        <div className="mt-8 w-full rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#2B2B23]/40">
            Tu código
          </p>
          <p className="mt-3 font-display text-6xl font-extrabold tracking-[0.2em]">
            <span className="text-[#2B2B23]">{first}</span>
            <span className="text-[#CDD917]">{last}</span>
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#2B2B23]/50">
            <Clock size={13} />
            <span>Válido por {remaining}</span>
          </div>
        </div>

        <div className="mt-4 w-full rounded-2xl bg-[#2B2B23] p-4 text-left text-white">
          <p className="text-[11px] uppercase tracking-wider text-white/60">Muestra al negocio</p>
          <p className="mt-1 font-display text-base font-bold">{benefit.businessName}</p>
          <p className="text-sm text-white/70">{benefit.promoTitle}</p>
        </div>

        <button
          type="button"
          onClick={share}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#2B2B23] py-3 font-display text-sm font-bold text-white"
        >
          <Share2 size={16} /> Compartir con amigos
        </button>

        <Link to="/" className="mt-4 text-xs font-medium text-[#2B2B23]/60">
          Volver al inicio
        </Link>
      </div>
    </MobileShell>
  );
}
