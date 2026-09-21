import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, Logo } from "@/components/enplan/MobileShell";
import { MapBackdrop } from "@/components/enplan/MapBackdrop";
import { enplanActions, useEnplanStore } from "@/lib/enplan-store";
import { z } from "zod";

const search = z.object({
  next: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Inicia sesión — enplan." },
      { name: "description", content: "Inicia sesión en enplan. para activar beneficios." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, sessionLoading } = useEnplanStore();
  const { next } = useSearch({ from: "/login" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!sessionLoading && user) {
    navigate({ to: next ?? "/", replace: true });
    return null;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError(null);
    setLoading(true);
    const result =
      mode === "signup"
        ? await enplanActions.signUp({ email, password, nombre: nombre || email.split("@")[0] })
        : await enplanActions.signIn({ email, password });
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate({ to: next ?? "/", replace: true });
  };

  return (
    <MobileShell showNav={false}>
      <MapBackdrop area="norte" />
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-12 pb-10">
        <Logo />
        <div className="mt-12">
          <h1 className="font-display text-2xl font-extrabold text-[#2B2B23]">
            {mode === "signup" ? "Crea tu cuenta" : "Inicia sesión para activar"}
          </h1>
          <p className="mt-2 text-sm text-[#2B2B23]/60">
            Accede a promociones exclusivas de negocios en Aguascalientes.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-[#D6D0C4]/60 bg-[#FAF8F3] px-4 py-3 text-sm outline-none focus:border-[#CDD917]"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-xl border border-[#D6D0C4]/60 bg-[#FAF8F3] px-4 py-3 text-sm outline-none focus:border-[#CDD917]"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-xl border border-[#D6D0C4]/60 bg-[#FAF8F3] px-4 py-3 text-sm outline-none focus:border-[#CDD917]"
          />
          {error && <p className="text-sm text-[#E04848]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#CDD917] py-3 font-display text-sm font-bold text-[#2B2B23] disabled:opacity-60"
          >
            {loading ? "Un momento…" : mode === "signup" ? "Crear cuenta" : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#2B2B23]/60">
          {mode === "signup" ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setError(null);
              setMode((m) => (m === "signup" ? "login" : "signup"));
            }}
            className="font-semibold text-[#2B2B23] underline-offset-4 hover:underline"
          >
            {mode === "signup" ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>

        <Link to="/" className="mt-auto pt-10 text-center text-xs text-[#2B2B23]/40">
          Volver al inicio
        </Link>
      </div>
    </MobileShell>
  );
}
