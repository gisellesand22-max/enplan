import React from "react";
import { cn } from "../utils/cn";

type ChipProps = {
  active?: boolean;
  onPress?: () => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function Chip({
  active = false,
  onPress,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={cn(
        "inline-flex shrink-0 items-center rounded-chip px-4 py-2 font-work-sans text-sm font-medium transition-colors duration-150",
        active
          ? "bg-carbon text-white"
          : "bg-arena-dark text-carbon hover:bg-arena-dark/80",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type ChipGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export function ChipGroup({ children, className }: ChipGroupProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
