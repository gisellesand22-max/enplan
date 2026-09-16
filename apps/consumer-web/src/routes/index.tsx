import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { BUSINESSES, type Business } from "@/lib/enplan-data";
import { MobileShell, Logo } from "@/components/enplan/MobileShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "enplan. — Descubre beneficios en Aguascalientes" },
      {
        name: "description",
        content:
          "Explora promociones exclusivas y verificables en restaurantes, gimnasios, bares y servicios en Aguascalientes.",
      },
      { property: "og:title", content: "enplan. — Beneficios en Aguascalientes" },
      {
        property: "og:description",
        content: "Promociones exclusivas en negocios locales de Aguascalientes.",
      },
    ],
  }),
  component: HomePage,
});

type CatChip = {
  key: string;
  label: string;
  icon: string;
  match?: (b: Business) => boolean;
};

const CHIPS: CatChip[] = [
  { key: "Todos", label: "Todos", icon: "/assets/icons/categories/todos.svg" },
  { key: "Comida", label: "Comida", icon: "/assets/icons/categories/comida.svg", match: (b) => b.category === "Comida" },
  { key: "Belleza", label: "Belleza", icon: "/assets/icons/categories/belleza.svg", match: (b) => b.category === "Belleza" },
  { key: "Fitness", label: "Fitness", icon: "/assets/icons/categories/fitness.svg", match: (b) => b.category === "Fitness" },
  { key: "Ocio", label: "Ocio", icon: "/assets/icons/categories/ocio.svg", match: (b) => b.category === "Ocio" },
  { key: "Tiendas", label: "Tiendas", icon: "/assets/icons/categories/tiendas.svg", match: (b) => b.category === "Tiendas" },
  { key: "Servicios", label: "Servicios", icon: "/assets/icons/categories/servicios.svg", match: (b) => b.category === "Servicios" },
];

function HomePage() {
  const [active, setActive] = useState<string>("Todos");

  const planRank: Record<string, number> = { Premium: 0, Pro: 1, "Básico": 2 };
  const base =
    active === "Todos"
      ? BUSINESSES
      : BUSINESSES.filter(CHIPS.find((c) => c.key === active)?.match ?? (() => false));
  const filtered = [...base].sort((a, b) => {
    const r = (planRank[a.plan] ?? 99) - (planRank[b.plan] ?? 99);
    return r !== 0 ? r : a.name.localeCompare(b.name, "es");
  });


  return (
    <MobileShell>
      <header className="flex items-center justify-between px-5 pt-10 pb-4">
        <Logo />
        <Link
          to="/ajustes"
          aria-label="Ajustes"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Menu size={20} className="text-[#2B2B23]" />
        </Link>
      </header>

      {/* Category chips */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-5">
        {CHIPS.map((c) => {
          const isActive = active === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(c.key)}
              className={`flex w-16 shrink-0 snap-start flex-col items-center gap-1.5 rounded-2xl border px-1.5 py-2 transition-colors ${
                isActive
                  ? "border-[#2B2B23] bg-white shadow-sm"
                  : "border-transparent bg-transparent"
              }`}
            >
              <img
                src={c.icon}
                alt=""
                className="h-10 w-10 rounded-xl object-contain"
              />
              <span
                className="text-[11px] leading-none"
                style={{
                  fontFamily: '"Work Sans", system-ui, sans-serif',
                  color: "#2B2B23",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Business listing */}
      <section className="px-5 pt-2 pb-6">
        <h2
          className="mb-3 font-display font-bold text-[#2B2B23]"
          style={{ fontSize: "18px" }}
        >
          Destacados
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-[#2B2B23]/60">
            Pronto agregaremos negocios en esta categoría.
          </div>
        )}
      </section>

    </MobileShell>
  );
}


function BusinessCard({ business }: { business: Business }) {
  const best = business.promos[0];
  return (
    <Link
      to="/business/$businessId"
      params={{ businessId: business.id }}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative flex h-[100px] items-center justify-center bg-[#D6D0C4]">
        <span className="text-[11px] text-[#2B2B23]/50">Foto</span>
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#2B2B23]/70">
          {business.category}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 font-display text-sm font-bold leading-tight text-[#2B2B23]">
          {business.name}
        </h3>
        {best && (
          <>
            <span className="mt-2 inline-block rounded-full bg-[#CDD917] px-2 py-0.5 text-[11px] font-bold text-[#2B2B23]">
              {best.type}
            </span>
            <p className="mt-1 line-clamp-1 text-xs text-[#2B2B23]/60">{best.title}</p>
          </>
        )}
      </div>
    </Link>
  );
}
