import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import { MapPin, Phone, Clock, MessageCircle, ArrowLeft } from "lucide-react";
import { BUSINESSES, type Business } from "@/lib/enplan-data";
import { useEnplanStore } from "@/lib/enplan-store";
import { MobileShell, Logo } from "@/components/enplan/MobileShell";

export const Route = createFileRoute("/business/$businessId")({
  loader: ({ params }): { business: Business } => {
    const business = BUSINESSES.find((b) => b.id === params.businessId);
    if (!business) throw notFound();
    return { business };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.business;
    const title = b ? `${b.name} — enplan.` : "Negocio — enplan.";
    const desc = b
      ? `${b.name} en Aguascalientes: ${b.promos[0]?.title ?? "promociones exclusivas"}.`
      : "Negocio en enplan.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <MobileShell showNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-xl font-bold">Negocio no encontrado</p>
        <Link to="/" className="mt-4 rounded-full bg-[#CDD917] px-5 py-2 text-sm font-semibold text-[#2B2B23]">
          Volver al inicio
        </Link>
      </div>
    </MobileShell>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <MobileShell showNav={false}>
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-lg font-bold">No pudimos cargar el negocio</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-4 rounded-full bg-[#CDD917] px-5 py-2 text-sm font-semibold text-[#2B2B23]"
          >
            Reintentar
          </button>
        </div>
      </MobileShell>
    );
  },
  component: BusinessPage,
});

const bodyFont = { fontFamily: '"Work Sans", system-ui, sans-serif' as const };
const WA_MESSAGE = "Hola, vi tu negocio en enplan. y me gustaría más información";

function BusinessPage() {
  const { business } = Route.useLoaderData() as { business: Business };
  const { user } = useEnplanStore();
  const navigate = useNavigate();

  const handleActivate = (promoId: string) => {
    if (!user) {
      navigate({
        to: "/login",
        search: { next: `/business/${business.id}/activate/${promoId}` },
      });
      return;
    }
    navigate({
      to: "/business/$businessId/activate/$promoId",
      params: { businessId: business.id, promoId },
    });
  };

  // Cada negocio tiene SU WhatsApp (viene del dato del negocio, no hardcodeado)
  const waUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`;
  const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;

  return (
    <MobileShell showNav={false}>
      {/* Top bar with back arrow + logo linking to home */}
      <div className="relative flex items-center justify-center bg-[#FAF8F3] px-4 py-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          aria-label="Regresar"
          className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2B2B23] shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <Link to="/" aria-label="Volver al inicio">
          <Logo />
        </Link>
      </div>
      {/* Header image */}
      <div className="relative">
        <div className="flex h-[220px] w-full items-center justify-center bg-[#D6D0C4] text-sm font-medium text-[#2B2B23]/50">
          Foto principal del negocio
        </div>
        <div
          className="absolute flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white bg-[#D6D0C4] text-[10px] text-[#2B2B23]/60"
          style={{ left: 16, bottom: -32 }}
        >
          Logo
        </div>
      </div>

      <div className="px-4 pt-10">
        <h1 className="font-display text-[20px] font-bold text-[#2B2B23]">
          {business.name}
        </h1>
        <span
          className="mt-1 inline-block rounded-full bg-[#CDD917] px-2.5 py-0.5 text-xs text-[#2B2B23]"
          style={bodyFont}
        >
          {business.category}
        </span>
        <p
          className="mt-3 line-clamp-2 text-sm text-[#2B2B23]/70"
          style={bodyFont}
        >
          {business.description}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-[13px] text-[#2B2B23]" style={bodyFont}>
            <Clock size={16} className="text-[#2B2B23]/60" />
            Lun–Vie 9:00–21:00
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#2B2B23]" style={bodyFont}>
            <MapPin size={16} className="text-[#2B2B23]/60" />
            {business.address}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={telUrl}
            className="flex items-center justify-center gap-2 rounded-full border border-[#2B2B23] py-2.5 text-sm font-semibold text-[#2B2B23]"
            style={bodyFont}
          >
            <Phone size={16} /> Llamar
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-semibold"
            style={{ ...bodyFont, borderColor: "#25D366", color: "#25D366" }}
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        {/* Photo gallery */}
        <h2 className="mt-7 font-display text-base font-bold text-[#2B2B23]">Fotos</h2>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-[90px] w-[120px] shrink-0 items-center justify-center rounded-lg bg-[#D6D0C4] text-[10px] text-[#2B2B23]/50"
            >
              Foto {i + 1}
            </div>
          ))}
        </div>

        {/* Promos */}
        <h2 className="mt-7 font-display text-base font-bold text-[#2B2B23]">
          Beneficios disponibles
        </h2>
        <div className="mt-3 space-y-3 pb-10">
          {business.promos.map((promo) => (
            <div key={promo.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="font-display text-sm font-bold text-[#2B2B23]">
                {promo.title}
              </h3>
              <p className="mt-1 text-[13px] text-[#2B2B23]/60" style={bodyFont}>
                {promo.description}
              </p>
              <button
                type="button"
                onClick={() => handleActivate(promo.id)}
                className="mt-4 w-full rounded-full bg-[#CDD917] py-3 font-display text-sm font-bold text-[#2B2B23] transition-transform active:scale-[0.98]"
              >
                Activar beneficio
              </button>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
