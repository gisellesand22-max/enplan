import { useSyncExternalStore } from "react";
import { supabase } from "./supabase";

export type ActiveBenefit = {
  id: string;
  businessId: string;
  businessName: string;
  promoType: string;
  promoTitle: string;
  code: string;
  activatedAt: number;
  expiresAt: number;
  status: "active" | "used" | "expired";
  ahorroCalculado: number;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type State = {
  user: User | null;
  sessionLoading: boolean;
  benefits: ActiveBenefit[];
  savedPlaces: string[];
};

const isBrowser = typeof window !== "undefined";

const initial: State = {
  user: null,
  sessionLoading: true,
  benefits: [],
  savedPlaces: [],
};

let state: State = initial;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function loadSaved() {
  if (!isBrowser) return;
  try {
    const raw = window.localStorage.getItem("enplan-saved");
    if (raw) state = { ...state, savedPlaces: JSON.parse(raw) };
  } catch {}
}

function persistSaved() {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem("enplan-saved", JSON.stringify(state.savedPlaces));
  } catch {}
}

async function loadUserRow(authUserId: string, fallbackEmail: string) {
  const { data } = await supabase
    .from("users")
    .select("id, nombre, email")
    .eq("id", authUserId)
    .single();

  state = {
    ...state,
    user: data
      ? { id: data.id, name: data.nombre, email: data.email }
      : { id: authUserId, name: fallbackEmail.split("@")[0] ?? "Usuario", email: fallbackEmail },
    sessionLoading: false,
  };
  emit();
}

let authInitialized = false;
function ensureAuthInitialized() {
  if (authInitialized || !isBrowser) return;
  authInitialized = true;

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      loadUserRow(session.user.id, session.user.email ?? "");
    } else {
      state = { ...state, user: null, sessionLoading: false };
      emit();
    }
  });

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      loadUserRow(session.user.id, session.user.email ?? "");
    } else {
      state = { ...state, user: null, benefits: [], sessionLoading: false };
      emit();
    }
  });
}

let savedLoaded = false;
function ensureLoaded() {
  ensureAuthInitialized();
  if (savedLoaded || !isBrowser) return;
  loadSaved();
  savedLoaded = true;
}

function subscribe(fn: () => void) {
  ensureLoaded();
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

function getServerSnapshot() {
  return initial;
}

export function useEnplanStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const enplanActions = {
  async signUp(input: { email: string; password: string; nombre: string }) {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: { data: { nombre: input.nombre, role: "consumidor" } },
    });
    if (error) return { error: error.message };
    if (data.session?.user) await loadUserRow(data.session.user.id, data.session.user.email ?? "");
    return { error: null };
  },
  async signIn(input: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });
    if (error) return { error: error.message };
    if (data.session?.user) await loadUserRow(data.session.user.id, data.session.user.email ?? "");
    return { error: null };
  },
  async logout() {
    await supabase.auth.signOut();
    state = { ...state, user: null, benefits: [] };
    emit();
  },
  async updateUser(patch: { name?: string; email?: string }) {
    if (!state.user) return { error: "No hay sesión" };
    if (patch.name) {
      const { error } = await supabase.from("users").update({ nombre: patch.name }).eq("id", state.user.id);
      if (error) return { error: error.message };
      state = { ...state, user: { ...state.user, name: patch.name } };
      emit();
    }
    if (patch.email) {
      const { error } = await supabase.auth.updateUser({ email: patch.email });
      if (error) return { error: error.message };
      // Supabase manda un correo de confirmación al nuevo email; no se refleja hasta confirmarlo.
    }
    return { error: null };
  },
  async refreshBenefits() {
    if (!state.user) return;
    const { data } = await supabase
      .from("activaciones")
      .select(
        "id, codigo_validacion, timestamp_activacion, timestamp_expiracion, estado, ahorro_calculado, negocios(id, nombre), promociones(tipo, titulo, valor)",
      )
      .eq("user_id", state.user.id)
      .order("timestamp_activacion", { ascending: false });

    state = {
      ...state,
      benefits: (data ?? []).map((row: any) => ({
        id: row.id,
        businessId: row.negocios?.id ?? "",
        businessName: row.negocios?.nombre ?? "",
        promoType: row.promociones?.valor ?? row.promociones?.tipo ?? "",
        promoTitle: row.promociones?.titulo ?? "",
        code: row.codigo_validacion,
        activatedAt: new Date(row.timestamp_activacion).getTime(),
        expiresAt: new Date(row.timestamp_expiracion).getTime(),
        status: row.estado === "activa" ? "active" : row.estado === "usada" ? "used" : "expired",
        ahorroCalculado: Number(row.ahorro_calculado ?? 0),
      })),
    };
    emit();
  },
  toggleSaved(businessId: string) {
    const isSaved = state.savedPlaces.includes(businessId);
    state = {
      ...state,
      savedPlaces: isSaved
        ? state.savedPlaces.filter((id) => id !== businessId)
        : [...state.savedPlaces, businessId],
    };
    persistSaved();
    emit();
  },
};

export function formatCountdown(expiresAt: number) {
  const ms = Math.max(0, expiresAt - Date.now());
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}
