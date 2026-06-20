import React from "react";
import { cn } from "../utils/cn";

const variants = {
  primary:
    "bg-lima text-carbon hover:bg-lima-400 active:bg-lima-600 font-semibold",
  secondary: "bg-carbon text-white hover:bg-carbon-600 active:bg-carbon-700",
  outline:
    "border-2 border-carbon text-carbon bg-transparent hover:bg-carbon hover:text-white active:bg-carbon-700 active:text-white",
  ghost:
    "text-carbon bg-transparent hover:bg-arena-dark/30 active:bg-arena-dark/50",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-chip font-work-sans transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lima focus-visible:ring-offset-2",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        (disabled || loading) && "pointer-events-none opacity-50",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
