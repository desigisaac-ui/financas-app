import { useMemo } from "react";
import { motion } from "framer-motion";
import { Transaction, MONTHS, MONTH_LABELS } from "@/lib/data";
import { formatBRL } from "@/lib/compute";
import { Action } from "@/lib/state";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { toast } from "sonner";

interface Props {
  transactions: Transaction[];
  filterMonth: string;
  dispatch: React.Dispatch<Action>;
}

export function TransactionList({ transactions, filterMonth, dispatch }: Props) {
  const filtered = useMemo(() => {
    if (filterMonth === "todos") return transactions;
    return transactions.filter((t) => t.months.includes(filterMonth));
  }, [transactions, filterMonth]);

  const entradas = filtered.filter((t) => t.type === "entrada");
  const saidas = filtered.filter((t) => t.type === "saida");

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", id });
    toast.success("Transação removida");
  };

  const renderGroup = (items: Transaction[], label: string, color: string) => (
    <div className="mb-6">
      <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        {label} ({items.length})
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)] py-3">Nenhuma transação neste período.</p>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-2">
          {items.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{t.description}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-[var(--color-surface-soft)] text-[var(--color-text-muted)] shrink-0">
                    {t.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {t.months.length === 1
                    ? MONTH_LABELS[MONTHS.indexOf(t.months[0])]
                    : `${t.months.length} meses`}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <span className="font-display font-bold text-sm" style={{ color }}>
                  {formatBRL(t.amount)}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => dispatch({ type: "EDIT_TRANSACTION", id: t.id })}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-[var(--color-error)]"
                    onClick={() => handleDelete(t.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => dispatch({ type: "SET_VIEW", view: "dashboard" })}
        className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-display font-semibold text-lg mb-4">Todas as Transações</h2>
        {renderGroup(entradas, "Entradas", "var(--color-entrada)")}
        {renderGroup(saidas, "Saídas", "var(--color-saida)")}
      </div>
    </div>
  );
}
