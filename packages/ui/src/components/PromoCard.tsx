import React from "react";
import { cn } from "../utils/cn";
import { Badge } from "./Badge";
import { Button } from "./Button";

type PromoCardProps = {
  businessName: string;
  promoTitle: string;
  promoType: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
  className?: string;
};

export function PromoCard({
  businessName,
  promoTitle,
  promoType,
  ctaLabel = "Activar",
  onCtaPress,
  className,
}: PromoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-card bg-white p-5 shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-work-sans text-sm font-medium text-carbon/60">
            {businessName}
          </p>
          <h3 className="mt-1 font-montserrat text-lg font-bold text-carbon">
            {promoTitle}
          </h3>
        </div>
        <Badge status="activa">{promoType}</Badge>
      </div>
      <Button size="sm" onClick={onCtaPress}>
        {ctaLabel}
      </Button>
    </div>
  );
}
