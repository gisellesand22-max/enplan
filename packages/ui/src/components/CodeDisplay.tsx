import React from "react";
import { cn } from "../utils/cn";

type CodeDisplayProps = {
  code: string;
  timeRemaining: string;
  businessName: string;
  promoTitle: string;
  className?: string;
};

export function CodeDisplay({
  code,
  timeRemaining,
  businessName,
  promoTitle,
  className,
}: CodeDisplayProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 rounded-card bg-white p-8 shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        {code.split("").map((digit, i) => (
          <span
            key={i}
            className="flex h-16 w-14 items-center justify-center rounded-card bg-lima/10 font-montserrat text-4xl font-extrabold text-carbon"
          >
            {digit}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-lima" />
        <span className="font-work-sans text-sm font-medium text-carbon/60">
          Expira en {timeRemaining}
        </span>
      </div>

      <div className="text-center">
        <p className="font-work-sans text-sm text-carbon/60">{businessName}</p>
        <p className="mt-0.5 font-montserrat text-base font-semibold text-carbon">
          {promoTitle}
        </p>
      </div>
    </div>
  );
}
