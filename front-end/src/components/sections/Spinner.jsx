import { memo } from "react";

/**
 * A tiny, elegant spinner built with Tailwind.
 *
 * Props:
 * - size: "sm" | "md" | "lg" (default: "md")
 * - colorClass: Tailwind text color utility, e.g. "text-indigo-600" (default: "text-slate-700")
 * - className: extra classes for outer wrapper
 */
 function Spinner({ size = "md", colorClass = "text-slate-700", className = "" }) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-7 w-7 border-[3px]",
    lg: "h-9 w-9 border-4",
  };

  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span
        className={`inline-block rounded-full animate-spin border-slate-300 border-t-current ${sizeClasses[size]} ${colorClass}`}
        /*
          Trick: we color only the top border via border-t-current,
          and set currentColor using a text-* class via colorClass.
        */
        style={{
          // Optional: slightly smoother spin
          animationDuration: "800ms",
        }}
      />
      <span className="sr-only">Loading…</span>
    </span>
  );
}

export default memo(Spinner)
