import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Transaction, MONTHS } from "@/lib/data";
import { getTotals, formatBRL } from "@/lib/compute";
import { staggerContainer, scaleIn } from "@/lib/motion";

interface Props {
  transactions: Transaction[];
  filterMonth: string;
}

export function OverviewCards({ transactions, filterMonth }: Props) {
  const { totalEntrada, totalSaida, saldo } = useMemo(
    () => getTotals(transactions, filterMonth),
    [transactions, filterMonth]
  );

  const cards = [
    {
      label: "Entradas",
      value: totalEntrada,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "var(--color-entrada)",
      bg: "var(--color-entrada-bg)",
    },
    {
      label: "Saídas",
      value: totalSaida,
      icon: <TrendingDown className="w-5 h-5" />,
      color: "var(--color-saida)",
      bg: "var(--color-saida-bg)",
    },
    {
      label: "Saldo",
      value: saldo,
      icon: <Wallet className="w-5 h-5" />,
      color: saldo >= 0 ? "var(--color-entrada)" : "var(--color-saida)",
      bg: saldo >= 0 ? "var(--color-entrada-bg)" : "var(--color-saida-bg)",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
    >
      {cards.map((c) => (
        <motion.div
          key={c.label}
          variants={scaleIn}
          className="rounded-xl p-4 border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              {c.label}
            </span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: c.bg, color: c.color }}
            >
              {c.icon}
            </div>
          </div>
          <p
            className="font-display text-xl font-bold tracking-tight"
            style={{ color: c.color }}
          >
            {formatBRL(c.value)}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
