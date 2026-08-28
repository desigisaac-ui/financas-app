import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/lib/data";
import { getMonthlyData, formatBRL } from "@/lib/compute";

interface Props {
  transactions: Transaction[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-lg">
      <p className="font-medium text-sm mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color }}>
          {p.name}: {formatBRL(p.value)}
        </p>
      ))}
    </div>
  );
};

export function IncomeExpenseChart({ transactions }: Props) {
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h3 className="font-display font-semibold text-base mb-4">
        Entradas vs Saídas por Mês
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(90% 0.005 130)" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "oklch(50% 0.01 130)" }}
              tickLine={false}
              axisLine={{ stroke: "oklch(88% 0.01 130)" }}
              interval={1}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(50% 0.01 130)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="entrada"
              name="Entradas"
              fill="oklch(58% 0.16 148)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
            <Bar
              dataKey="saida"
              name="Saídas"
              fill="oklch(52% 0.18 25)"
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
