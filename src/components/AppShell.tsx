import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { FEATURES, NAV_MORE, NAV_OVERVIEW } from "@/lib/features";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

function NavLink({
  to,
  label,
  icon: Icon,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      activeOptions={{ exact: to === "/" }}
      className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-ink-foreground/70 transition-colors hover:bg-ink-softer/70 hover:text-ink-foreground"
      activeProps={{
        className:
          "border-primary/40 bg-ink-softer text-ink-foreground [&_svg]:text-primary",
      }}
    >
      <Icon className="size-4 shrink-0 opacity-80 transition-colors group-hover:text-primary" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {open && (
        <button
          aria-label="Close menu"
          onClick={close}
          className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "gradient-ink fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col overflow-y-auto px-4 py-6 text-ink-foreground transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-5 flex items-center gap-3 border-b border-ink-foreground/10 px-2 pb-5">
          <div className="gradient-brand flex size-9 shrink-0 items-center justify-center rounded-lg font-display text-base font-bold text-primary-foreground shadow-glow">
            D
          </div>
          <div className="min-w-0">
            <div className="font-display text-base leading-tight font-bold">Deskline</div>
            <div className="mono-label text-ink-muted">AI Workplace Assistant</div>
          </div>
          <button
            onClick={close}
            aria-label="Close menu"
            className="ml-auto flex size-8 items-center justify-center rounded-lg bg-ink-foreground/10 lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mono-label px-3 pb-2 text-ink-muted">Overview</div>
        <nav className="flex flex-col gap-0.5">
          {NAV_OVERVIEW.map((n) => (
            <NavLink key={n.to} {...n} onNavigate={close} />
          ))}
        </nav>

        <div className="mono-label px-3 pt-5 pb-2 text-ink-muted">AI Tools</div>
        <nav className="flex flex-col gap-0.5">
          {FEATURES.map((f) => (
            <NavLink
              key={f.key}
              to={f.to}
              label={f.label}
              icon={f.icon}
              onNavigate={close}
            />
          ))}
        </nav>

        <div className="mono-label px-3 pt-5 pb-2 text-ink-muted">More</div>
        <nav className="flex flex-col gap-0.5">
          {NAV_MORE.map((n) => (
            <NavLink key={n.to} {...n} onNavigate={close} />
          ))}
        </nav>

        <div className="mt-auto pt-5">
          <ThemeToggle className="w-full justify-center" />
        </div>

        <div className="mt-3 rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 p-3.5 text-xs leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink-foreground">Responsible AI:</span> outputs
          are AI-generated drafts. Review before sending, sharing, or acting on them. Avoid
          entering confidential data.
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="gradient-ink sticky top-0 z-30 flex items-center justify-between px-4 py-3 text-ink-foreground lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex size-9 items-center justify-center rounded-lg bg-ink-foreground/10"
          >
            <Menu className="size-5" />
          </button>
          <span className="font-display font-bold">Deskline</span>
          <ThemeToggle className="px-2.5 py-1.5 [&>span]:hidden" />
        </header>

        <main className="flex-1 px-5 pt-6 pb-14 sm:px-8 lg:px-10 lg:pt-9">{children}</main>

        <footer className="border-t border-border px-5 py-6 sm:px-8 lg:px-10">
          <div className="mono-label flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
            <span>Deskline — AI workplace productivity assistant</span>
            <span>Drafts only · always human-reviewed</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
