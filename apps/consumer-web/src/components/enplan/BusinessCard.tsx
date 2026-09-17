import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Business } from "@/lib/enplan-data";
import { enplanActions, useEnplanStore } from "@/lib/enplan-store";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function BusinessCard({ business }: { business: Business }) {
  const { savedPlaces } = useEnplanStore();
  const saved = savedPlaces.includes(business.id);
  const best = business.promos[0];

  return (
    <div className="relative">
      <Link
        to="/business/$businessId"
        params={{ businessId: business.id }}
        className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        {business.fotoPrincipal === "logo" ? (
          <div className="relative flex h-[100px] items-center justify-center bg-[#FAF8F3]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CDD917] font-display text-lg font-extrabold text-[#2B2B23]">
              {initials(business.name)}
            </div>
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#2B2B23]/70">
              {business.category}
            </span>
          </div>
        ) : (
          <div className="relative flex h-[100px] items-center justify-center bg-[#D6D0C4]">
            <span className="text-[11px] text-[#2B2B23]/50">Foto</span>
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#2B2B23]/70">
              {business.category}
            </span>
          </div>
        )}
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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          enplanActions.toggleSaved(business.id);
        }}
        aria-label={saved ? "Quitar de guardados" : "Guardar lugar"}
        aria-pressed={saved}
        className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-transform active:scale-90 ${
          saved ? "bg-[#CDD917]" : "bg-white/95"
        }`}
      >
        <Heart
          size={14}
          className={saved ? "fill-[#2B2B23] text-[#2B2B23]" : "text-[#2B2B23]/70"}
        />
      </button>
    </div>
  );
}
