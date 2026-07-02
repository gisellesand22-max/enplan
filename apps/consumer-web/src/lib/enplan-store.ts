import { useSyncExternalStore } from "react";

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
};

type User = {
  name: string;
  email: string;
};

type State = {
  user: User | null;
  benefits: ActiveBenefit[];
};

const isBrowser = typeof window !== "undefined";

const initial: State = {
  user: null,
  benefits: [
    // historic demo (when user logs in we show these)
  ],
};

let state: State = initial;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function load() {
  if (!isBrowser) return;
  try {
    const raw = window.localStorage.getItem("enplan-state");
    if (raw) state = JSON.parse(raw);
  } catch {}
}

function persist() {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem("enplan-state", JSON.stringify(state));
  } catch {}
}

let loaded = false;
function ensureLoaded() {
  if (loaded || !isBrowser) return;
  load();
  loaded = true;
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
  login(email: string) {
    const name = email.split("@")[0] || "Amigo";
    state = {
      ...state,
      user: { email, name: name.charAt(0).toUpperCase() + name.slice(1) },
      benefits: state.benefits.length
        ? state.benefits
        : seedHistory(),
    };
    persist();
    emit();
  },
  logout() {
    state = { ...state, user: null };
    persist();
    emit();
  },
  activate(input: {
    businessId: string;
    businessName: string;
    promoType: string;
    promoTitle: string;
  }) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const now = Date.now();
    const benefit: ActiveBenefit = {
      id: `${input.businessId}-${now}`,
      businessId: input.businessId,
      businessName: input.businessName,
      promoType: input.promoType,
      promoTitle: input.promoTitle,
      code,
      activatedAt: now,
      expiresAt: now + 24 * 60 * 60 * 1000,
      status: "active",
    };
    state = { ...state, benefits: [benefit, ...state.benefits] };
    persist();
    emit();
    return benefit;
  },
};

function seedHistory(): ActiveBenefit[] {
  const day = 24 * 60 * 60 * 1000;
  const now = Date.now();
  return [
    {
      id: "h1",
      businessId: "cafe-la-estacion",
      businessName: "Café La Estación",
      promoType: "2x1",
      promoTitle: "2x1 en cualquier café",
      code: "8421",
      activatedAt: now - 30 * 60 * 1000,
      expiresAt: now + day - 30 * 60 * 1000,
      status: "active",
    },
    {
      id: "h2",
      businessId: "gym-fitzone",
      businessName: "Gym FitZone",
      promoType: "Gratis",
      promoTitle: "Primera clase gratis",
      code: "1276",
      activatedAt: now - 2 * 60 * 60 * 1000,
      expiresAt: now + day - 2 * 60 * 60 * 1000,
      status: "active",
    },
    {
      id: "h3",
      businessId: "taqueria-don-pedro",
      businessName: "Taquería Don Pedro",
      promoType: "Gratis",
      promoTitle: "Agua fresca gratis",
      code: "3098",
      activatedAt: now - 3 * day,
      expiresAt: now - 2 * day,
      status: "used",
    },
    {
      id: "h4",
      businessId: "bar-el-patio",
      businessName: "Bar El Patio",
      promoType: "20%",
      promoTitle: "20% en tu cuenta",
      code: "5512",
      activatedAt: now - 6 * day,
      expiresAt: now - 5 * day,
      status: "used",
    },
    {
      id: "h5",
      businessId: "cine-central",
      businessName: "Cine Central",
      promoType: "2x1",
      promoTitle: "2x1 en boletos",
      code: "7740",
      activatedAt: now - 14 * day,
      expiresAt: now - 13 * day,
      status: "expired",
    },
    {
      id: "h6",
      businessId: "yoga-zen-studio",
      businessName: "Yoga Zen Studio",
      promoType: "Clase",
      promoTitle: "Clase de prueba gratis",
      code: "2204",
      activatedAt: now - 20 * day,
      expiresAt: now - 19 * day,
      status: "expired",
    },
  ];
}

export function formatCountdown(expiresAt: number) {
  const ms = Math.max(0, expiresAt - Date.now());
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}
