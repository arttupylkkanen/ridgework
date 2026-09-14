import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function LockedCell({
  unlocked,
  label,
  children,
  className,
}: {
  unlocked: boolean;
  label: string;
  children: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {unlocked ? (
        <p className="text-sm leading-relaxed text-ink-muted">{children}</p>
      ) : (
        <>
          <p className="select-none text-sm leading-relaxed text-ink-muted blur-sm" aria-hidden="true">
            {children}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-warm px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            <Lock className="size-3" aria-hidden="true" />
            {label}
          </span>
        </>
      )}
    </div>
  );
}
