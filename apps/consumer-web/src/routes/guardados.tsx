import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { BUSINESSES } from "@/lib/enplan-data";
import { useEnplanStore } from "@/lib/enplan-store";
import { MobileShell } from "@/components/enplan/MobileShell";
import { MapBackdrop } from "@/components/enplan/MapBackdrop";
import { BusinessCard } from "@/components/enplan/BusinessCard";

export const Route = createFileRoute("/guardados")({
  head: () => ({
    meta: [
      { title: "Lugares guardados — enplan." },
      { name: "description", content: "Tus negocios guardados en enplan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GuardadosPage,
});

const bodyFont = { fontFamily: '"Work Sans", system-ui, sans-serif' as const };

function GuardadosPage() {
  const { savedPlaces } = useEnplanStore();
  const saved = BUSINESSES.filter((b) => savedPlaces.includes(b.id));

  return (
    <MobileShell>
      <MapBackdrop area="sur" />
      <div className="relative z-10">
      <header className="px-5 pt-10 pb-4">
        <h1 className="font-display text-[22px] font-bold text-[#2B2B23]">Lugares guardados</h1>
      </header>

      <section className="px-5 pb-10">
        {saved.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <Heart size={48} className="mx-auto text-[#D6D0C4]" />
            <p className="mt-4 font-display text-base font-bold text-[#2B2B23]">
              Aún no tienes lugares guardados
            </p>
            <p className="mt-1 text-sm text-[#2B2B23]/60" style={bodyFont}>
              Toca el corazón en cualquier negocio para guardarlo aquí.
            </p>
            <Link
              to="/"
              className="mt-5 inline-block rounded-full bg-[#CDD917] px-6 py-2.5 font-display text-sm font-bold text-[#2B2B23]"
            >
              Explorar
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {saved.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        )}
      </section>
      </div>
    </MobileShell>
  );
}
