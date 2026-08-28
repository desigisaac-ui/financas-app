import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { Transaction } from "@/lib/data";
import { getBalanceProjection, formatBRL } from "@/lib/compute";

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

export function DebtChart({ transactions }: Props) {
  const data = useMemo(() => getBalanceProjection(transactions), [transactions]);

  const breakEvenIdx = useMemo(() => {
    for (let i = 1; i < data.length; i++) {
      if (data[i - 1].saldo < 0 && data[i].saldo >= 0) return i;
    }
    return -1;
  }, [data]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-base">
            Projeção de Saldo Acumulado
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            {breakEvenIdx >= 0
              ? `Dívidas zeradas em ${data[breakEvenIdx].label}`
              : data[data.length - 1].saldo >= 0
                ? "Saldo positivo em todo o período"
                : "Dívidas persistem até o fim do período"}
          </p>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(90% 0.005 130)" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "oklch(50% 0.01 130)" }}
              tickLine={false}
              axisLine={{ stroke: "oklch(88% 0.01 130)" }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(50% 0.01 130)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="oklch(50% 0.01 130)" strokeDasharray="4 4" />
            <Line
              type="monotone"
              dataKey="saldo"
              name="Saldo Acumulado"
              stroke="oklch(84% 0.18 130)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "oklch(84% 0.18 130)", stroke: "oklch(99% 0 0)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
