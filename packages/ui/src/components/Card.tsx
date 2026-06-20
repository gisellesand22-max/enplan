import React from "react";
import { cn } from "../utils/cn";

const paddings = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
} as const;

type CardProps = {
  padding?: keyof typeof paddings;
  hoverable?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({
  padding = "md",
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card bg-white shadow-card",
        paddings[padding],
        hoverable &&
          "cursor-pointer transition-shadow duration-150 hover:shadow-card-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
