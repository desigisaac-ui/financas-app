import { useMemo } from "react";
import { Transaction } from "@/lib/data";
import { getCategoryBreakdown, formatBRL } from "@/lib/compute";

interface Props {
  transactions: Transaction[];
  filterMonth: string;
}

const COLORS = [
  "oklch(52% 0.18 25)",
  "oklch(58% 0.16 148)",
  "oklch(65% 0.14 230)",
  "oklch(82% 0.16 90)",
  "oklch(72% 0.12 320)",
  "oklch(60% 0.12 30)",
  "oklch(55% 0.15 280)",
  "oklch(70% 0.10 60)",
  "oklch(50% 0.12 180)",
];

export function CategoryChart({ transactions, filterMonth }: Props) {
  const data = useMemo(() => getCategoryBreakdown(transactions, filterMonth), [transactions, filterMonth]);
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  if (data.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h3 className="font-display font-semibold text-base mb-4">Saídas por Categoria</h3>
      <div className="space-y-2.5">
        {data.map((item, i) => {
          const pct = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.name}</span>
                <span className="text-[var(--color-text-muted)]">
                  {formatBRL(item.value)} ({pct.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--color-surface-soft)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
