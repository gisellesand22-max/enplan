import React from "react";
import { cn } from "../utils/cn";

const statuses = {
  activa: "bg-lima text-carbon",
  usada: "bg-carbon text-white",
  expirada: "bg-arena-dark text-carbon",
} as const;

type BadgeProps = {
  status: keyof typeof statuses;
  className?: string;
  children?: React.ReactNode;
};

const defaultLabels: Record<keyof typeof statuses, string> = {
  activa: "Activa",
  usada: "Usada",
  expirada: "Expirada",
};

export function Badge({ status, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-work-sans text-xs font-semibold",
        statuses[status],
        className,
      )}
    >
      {children || defaultLabels[status]}
    </span>
  );
}
