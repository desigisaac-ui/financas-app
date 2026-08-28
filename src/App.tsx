import { useReducer, useMemo, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/Nav";
import { OverviewCards } from "@/components/OverviewCards";
import { IncomeExpenseChart } from "@/components/IncomeExpenseChart";
import { DebtChart } from "@/components/DebtChart";
import { CategoryChart } from "@/components/CategoryChart";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { MonthFilter } from "@/components/MonthFilter";
import { reducer, AppState } from "@/lib/state";
import { buildInitialTransactions } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const STORAGE_KEY = "financas-app-v1";

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.transactions?.length > 0) return { ...parsed, view: "dashboard", editingId: null };
    }
  } catch { /* ignore */ }
  return {
    transactions: buildInitialTransactions(),
    view: "dashboard",
    addType: "entrada",
    filterMonth: "todos",
    editingId: null,
  };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        transactions: state.transactions,
        view: state.view,
        addType: state.addType,
        filterMonth: state.filterMonth,
      }));
    } catch { /* quota */ }
  }, [state.transactions, state.filterMonth, state.addType]);

  const editingTxn = useMemo(
    () => state.editingId ? state.transactions.find((t) => t.id === state.editingId) ?? null : null,
    [state.editingId, state.transactions]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "n") {
      e.preventDefault();
      dispatch({ type: "SET_VIEW", view: "add" });
    }
    if (e.key === "Escape" && state.view !== "dashboard") {
      dispatch({ type: "SET_VIEW", view: "dashboard" });
    }
  }, [state.view]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen pb-12">
      <Nav
        view={state.view}
        onNavigate={(v) => dispatch({ type: "SET_VIEW", view: v })}
      />
      <main className="max-w-5xl mx-auto px-4 pt-6">
        {state.view === "dashboard" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight leading-tight">
                  Minhas Finanças
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                  Controle de entradas e saídas
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MonthFilter
                  value={state.filterMonth}
                  onChange={(m) => dispatch({ type: "SET_FILTER_MONTH", month: m })}
                />
                <Button
                  onClick={() => dispatch({ type: "SET_VIEW", view: "add" })}
                  className="gap-1.5"
                  style={{ background: "var(--color-primary)", color: "var(--color-text-primary)" }}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Nova</span>
                </Button>
              </div>
            </div>

            <OverviewCards transactions={state.transactions} filterMonth={state.filterMonth} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <IncomeExpenseChart transactions={state.transactions} />
              <CategoryChart transactions={state.transactions} filterMonth={state.filterMonth} />
            </div>

            <DebtChart transactions={state.transactions} />

            <p className="text-center text-xs text-[var(--color-text-muted)] pt-2">
              Pressione{" "}
              <kbd className="px-1.5 py-0.5 bg-[var(--color-surface-soft)] border border-[var(--color-border)] rounded text-[10px] font-mono">
                Ctrl+N
              </kbd>{" "}
              para adicionar · dados salvos localmente
            </p>
          </div>
        )}

        {state.view === "add" && (
          <TransactionForm
            dispatch={dispatch}
            addType={state.addType}
            editing={editingTxn}
          />
        )}

        {state.view === "transactions" && (
          <TransactionList
            transactions={state.transactions}
            filterMonth={state.filterMonth}
            dispatch={dispatch}
          />
        )}
      </main>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
