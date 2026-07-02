import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, Logo } from "@/components/enplan/MobileShell";
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
  const { user } = useEnplanStore();
  const { next } = useSearch({ from: "/login" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    navigate({ to: next ?? "/", replace: true });
    return null;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    enplanActions.login(email);
    navigate({ to: next ?? "/", replace: true });
  };

  const google = () => {
    enplanActions.login("carlos@gmail.com");
    navigate({ to: next ?? "/", replace: true });
  };

  return (
    <MobileShell showNav={false}>
      <div className="flex min-h-screen flex-col px-6 pt-12 pb-10">
        <Logo />
        <div className="mt-12">
          <h1 className="font-display text-2xl font-extrabold text-[#2B2B23]">
            Inicia sesión para activar
          </h1>
          <p className="mt-2 text-sm text-[#2B2B23]/60">
            Accede a promociones exclusivas de negocios en Aguascalientes.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-3">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-xl border border-[#D6D0C4]/60 bg-[#FAF8F3] px-4 py-3 text-sm outline-none focus:border-[#CDD917]"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-[#CDD917] py-3 font-display text-sm font-bold text-[#2B2B23]"
          >
            Entrar
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-[#2B2B23]/40">
          <span className="h-px flex-1 bg-[#D6D0C4]/60" />
          o continúa con
          <span className="h-px flex-1 bg-[#D6D0C4]/60" />
        </div>

        <button
          type="button"
          onClick={google}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#2B2B23]/20 bg-white py-3 text-sm font-semibold text-[#2B2B23]"
        >
          <GoogleIcon /> Continuar con Google
        </button>

        <p className="mt-auto pt-10 text-center text-sm text-[#2B2B23]/60">
          ¿No tienes cuenta?{" "}
          <Link
            to="/login"
            search={{ next }}
            className="font-semibold text-[#2B2B23] underline-offset-4 hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.4-1.6 4.1-5.4 4.1-3.3 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.6 3.7 14.5 2.7 12 2.7 6.9 2.7 2.8 6.8 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}
