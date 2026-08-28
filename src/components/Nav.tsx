import { View } from "@/lib/state";
import { LayoutDashboard, PlusCircle, List } from "lucide-react";

interface NavProps {
  view: View;
  onNavigate: (v: View) => void;
}

export function Nav({ view, onNavigate }: NavProps) {
  const items: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Painel", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "add", label: "Adicionar", icon: <PlusCircle className="w-5 h-5" /> },
    { id: "transactions", label: "Transações", icon: <List className="w-5 h-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: "var(--color-primary)" }}>
            <span className="font-display font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>F</span>
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Finanças</span>
        </div>
        <nav className="flex gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                ${view === item.id
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }
              `}
              style={view === item.id ? { background: "var(--color-primary-pale)" } : {}}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
