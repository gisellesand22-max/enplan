import React from "react";
import { cn } from "../utils/cn";

type ValidationSuccess = {
  status: "success";
  customerName: string;
  promoTitle: string;
};

type ValidationError = {
  status: "error";
  reason: "expired" | "already_used" | "wrong_business" | "invalid_code";
};

type ValidationResultProps = {
  result: ValidationSuccess | ValidationError;
  className?: string;
};

const errorMessages: Record<ValidationError["reason"], string> = {
  expired: "Este código ha expirado",
  already_used: "Este código ya fue utilizado",
  wrong_business: "Este código no corresponde a tu negocio",
  invalid_code: "Código inválido",
};

export function ValidationResult({ result, className }: ValidationResultProps) {
  const isSuccess = result.status === "success";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-card p-8",
        isSuccess ? "bg-lima/10" : "bg-red-50",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full",
          isSuccess ? "bg-lima" : "bg-red-500",
        )}
      >
        {isSuccess ? (
          <svg
            className="h-8 w-8 text-carbon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            className="h-8 w-8 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </div>

      {isSuccess ? (
        <div className="text-center">
          <p className="font-montserrat text-xl font-bold text-carbon">
            {result.customerName}
          </p>
          <p className="mt-1 font-work-sans text-sm text-carbon/60">
            {result.promoTitle}
          </p>
          <p className="mt-3 font-work-sans text-sm font-semibold text-lima-700">
            Promoción aplicada
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-montserrat text-lg font-bold text-carbon">
            No se pudo validar
          </p>
          <p className="mt-1 font-work-sans text-sm text-red-600">
            {errorMessages[result.reason]}
          </p>
        </div>
      )}
    </div>
  );
}
