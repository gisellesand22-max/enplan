import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Share2, LogOut, Settings, Copy, Check } from "lucide-react";
import { MobileShell, Logo } from "@/components/enplan/MobileShell";
import { enplanActions, useEnplanStore } from "@/lib/enplan-store";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil — enplan." },
      { name: "description", content: "Gestiona tu cuenta enplan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const bodyFont = { fontFamily: '"Work Sans", system-ui, sans-serif' as const };
const REFERRAL_HANDLE = "usuario123";
const REFERRAL_LINK = `enplan.app/ref/${REFERRAL_HANDLE}`;
const REFERRAL_COUNT = 0;

function ProfilePage() {
  const { user, benefits } = useEnplanStore();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!user) {
    return (
      <MobileShell>
        <header className="flex items-center justify-between px-5 pt-10 pb-2">
          <h1 className="font-display text-[26px] font-bold">Perfil</h1>
          <Logo />
        </header>
        <div className="flex flex-1 items-center justify-center px-6 pt-16">
          <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="font-display text-base font-bold">
              Inicia sesión en enplan.
            </p>
            <p className="mt-1 text-sm text-[#2B2B23]/60" style={bodyFont}>
              Guarda beneficios, lleva tu historial y comparte con amigos.
            </p>
            <Link
              to="/login"
              className="mt-5 inline-block rounded-full bg-[#CDD917] px-6 py-2.5 font-display text-sm font-bold text-[#2B2B23]"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </MobileShell>
    );
  }

  const initials = user.name.slice(0, 2).toUpperCase();
  const used = benefits.filter((b) => b.status === "used").length || 12;
  const visited = new Set(benefits.map((b) => b.businessId)).size || 8;

  const stats = [
    { label: "Beneficios usados", value: String(used), accent: false },
    { label: "Negocios visitados", value: String(visited), accent: false },
    { label: "Amigos referidos", value: String(REFERRAL_COUNT), accent: false },
    { label: "Ahorro estimado", value: "~$1,840", accent: true },
  ];


  const copyLink = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`https://${REFERRAL_LINK}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {}
    }
  };

  const shareReferral = async () => {
    const text = `Descarga enplan. gratis y consigue beneficios en los mejores negocios de Aguascalientes: https://${REFERRAL_LINK}`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title: "enplan.", text });
      } catch {}
    } else {
      await copyLink();
    }
  };

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-5 pt-10">
        <Logo />
        <Link
          to="/ajustes"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
          aria-label="Ajustes"
        >
          <Settings size={16} className="text-[#2B2B23]" />
        </Link>
      </header>

      <div className="flex flex-col items-center px-5 pt-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#CDD917] font-display text-xl font-extrabold text-[#2B2B23]">
          {initials}
        </div>
        <p className="mt-3 font-display text-lg font-bold text-[#2B2B23]">{user.name}</p>
        <p className="text-sm text-[#2B2B23]/60" style={bodyFont}>{user.email}</p>
      </div>

      <section className="mt-7 px-5">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className={`font-display text-2xl font-extrabold ${s.accent ? "text-[#CDD917]" : "text-[#2B2B23]"}`}>{s.value}</p>
              <p className="mt-1 text-xs text-[#2B2B23]/55" style={bodyFont}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Referidos */}
      <section className="mt-7 px-5">
        <h2 className="mb-3 font-display text-base font-bold text-[#2B2B23]">Referidos</h2>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="font-display text-2xl font-bold text-[#CDD917]">
            {REFERRAL_COUNT}{" "}
            <span className="text-sm font-normal text-[#2B2B23]" style={bodyFont}>
              {(REFERRAL_COUNT as number) === 1 ? "amigo referido" : "amigos referidos"}
            </span>
          </p>
          <p className="mt-1 text-sm text-[#2B2B23]/60" style={bodyFont}>
            Has referido {REFERRAL_COUNT} amigos
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-full bg-[#D6D0C4] px-3 py-2">
            <code className="min-w-0 flex-1 truncate font-mono text-xs text-[#2B2B23]">
              {REFERRAL_LINK}
            </code>
            <button
              type="button"
              onClick={copyLink}
              className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2B2B23]"
              style={bodyFont}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>

          <button
            type="button"
            onClick={shareReferral}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#CDD917] py-3 font-display text-sm font-bold text-[#2B2B23]"
          >
            <Share2 size={16} /> Compartir link
          </button>
        </div>
      </section>

      <div className="mt-8 flex justify-center px-5 pb-10">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && !window.confirm("¿Cerrar sesión en enplan.?")) return;
            enplanActions.logout();
            navigate({ to: "/" });
          }}
          className="flex items-center gap-2 text-sm font-semibold text-[#2B2B23]/50"
          style={bodyFont}
        >
          <LogOut size={15} /> Cerrar sesión
        </button>
      </div>
    </MobileShell>
  );
}
