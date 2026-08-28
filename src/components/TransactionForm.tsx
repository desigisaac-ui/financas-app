import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Transaction, MONTHS, MONTH_LABELS, CATEGORIES } from "@/lib/data";
import { Action } from "@/lib/state";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Props {
  dispatch: React.Dispatch<Action>;
  addType: "entrada" | "saida";
  editing: Transaction | null;
}

export function TransactionForm({ dispatch, addType, editing }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [type, setType] = useState<"entrada" | "saida">(addType);

  useEffect(() => {
    if (editing) {
      setDescription(editing.description);
      setAmount(editing.amount.toString().replace(".", ","));
      setCategory(editing.category);
      setSelectedMonths(editing.months);
      setType(editing.type);
    }
  }, [editing]);

  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const selectAllMonths = () => {
    setSelectedMonths(selectedMonths.length === MONTHS.length ? [] : [...MONTHS]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(",", "."));
    if (!description.trim()) { toast.error("Preencha a descrição"); return; }
    if (isNaN(numAmount) || numAmount <= 0) { toast.error("Valor inválido"); return; }
    if (selectedMonths.length === 0) { toast.error("Selecione ao menos um mês"); return; }

    if (editing) {
      dispatch({
        type: "UPDATE_TRANSACTION",
        txn: { ...editing, description: description.trim(), amount: numAmount, category, months: selectedMonths, type },
      });
      toast.success("Transação atualizada");
    } else {
      dispatch({
        type: "ADD_TRANSACTION",
        txn: { description: description.trim(), amount: numAmount, category, months: selectedMonths, type },
      });
      toast.success(type === "entrada" ? "Entrada adicionada" : "Saída adicionada");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => dispatch({ type: "SET_VIEW", view: "dashboard" })}
        className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-display font-semibold text-lg mb-5">
          {editing ? "Editar Transação" : "Nova Transação"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle */}
          <div className="flex rounded-lg overflow-hidden border border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => setType("entrada")}
              className={`flex-1 py-2.5 text-sm font-medium transition-all duration-150 ${
                type === "entrada"
                  ? "text-[var(--color-surface)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              }`}
              style={type === "entrada" ? { background: "var(--color-entrada)" } : { background: "var(--color-surface)" }}
            >
              + Entrada
            </button>
            <button
              type="button"
              onClick={() => setType("saida")}
              className={`flex-1 py-2.5 text-sm font-medium transition-all duration-150 ${
                type === "saida"
                  ? "text-[var(--color-surface)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              }`}
              style={type === "saida" ? { background: "var(--color-saida)" } : { background: "var(--color-surface)" }}
            >
              - Saída
            </button>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Salário, Aluguel, Internet..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm font-medium">Valor (R$)</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              inputMode="decimal"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Month multi-select */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">
                Meses <span className="text-[var(--color-text-muted)] font-normal">({selectedMonths.length} selecionados)</span>
              </Label>
              <button
                type="button"
                onClick={selectAllMonths}
                className="text-xs font-medium hover:underline"
                style={{ color: "var(--color-primary-hover)" }}
              >
                {selectedMonths.length === MONTHS.length ? "Desmarcar todos" : "Selecionar todos"}
              </button>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-3 max-h-48 overflow-y-auto">
              <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">2026</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 mb-3">
                {MONTHS.slice(0, 12).map((m, i) => (
                  <label
                    key={m}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all duration-100
                      ${selectedMonths.includes(m)
                        ? "font-medium"
                        : "text-[var(--color-text-muted)]"
                      }`}
                    style={selectedMonths.includes(m) ? { background: "var(--color-primary-pale)", color: "var(--color-text-primary)" } : { background: "var(--color-surface-soft)" }}
                  >
                    <Checkbox
                      checked={selectedMonths.includes(m)}
                      onCheckedChange={() => toggleMonth(m)}
                      className="h-3.5 w-3.5"
                    />
                    {MONTH_LABELS[i]}
                  </label>
                ))}
              </div>
              <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">2027</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {MONTHS.slice(12).map((m, i) => (
                  <label
                    key={m}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs cursor-pointer transition-all duration-100
                      ${selectedMonths.includes(m)
                        ? "font-medium"
                        : "text-[var(--color-text-muted)]"
                      }`}
                    style={selectedMonths.includes(m) ? { background: "var(--color-primary-pale)", color: "var(--color-text-primary)" } : { background: "var(--color-surface-soft)" }}
                  >
                    <Checkbox
                      checked={selectedMonths.includes(m)}
                      onCheckedChange={() => toggleMonth(m)}
                      className="h-3.5 w-3.5"
                    />
                    {MONTH_LABELS[i + 12]}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full font-medium"
            style={{ background: type === "entrada" ? "var(--color-entrada)" : "var(--color-saida)", color: "var(--color-surface)" }}
          >
            {editing ? "Salvar Alterações" : type === "entrada" ? "Adicionar Entrada" : "Adicionar Saída"}
          </Button>
        </form>
      </div>
    </div>
  );
}
