import React from "react";
import { cn } from "../utils/cn";

type InputProps = {
  label?: string;
  error?: string;
  variant?: "default" | "large";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export function Input({
  label,
  error,
  variant = "default",
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block font-work-sans text-sm font-medium text-carbon"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-card border bg-arena font-work-sans text-carbon outline-none transition-colors duration-150 placeholder:text-carbon/40 focus:border-carbon focus:ring-1 focus:ring-carbon",
          variant === "default" && "border-arena-dark px-4 py-2.5 text-base",
          variant === "large" &&
            "border-arena-dark px-6 py-4 text-center font-montserrat text-3xl font-bold tracking-[0.3em]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 font-work-sans text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
