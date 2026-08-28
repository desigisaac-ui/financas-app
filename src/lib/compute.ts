import { Transaction, MONTHS, MONTH_LABELS } from "./data";

export function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getMonthlyData(transactions: Transaction[]) {
  return MONTHS.map((month, i) => {
    let entrada = 0;
    let saida = 0;
    for (const t of transactions) {
      if (t.months.includes(month)) {
        if (t.type === "entrada") entrada += t.amount;
        else saida += t.amount;
      }
    }
    return {
      month,
      label: MONTH_LABELS[i],
      entrada,
      saida,
      saldo: entrada - saida,
    };
  });
}

export function getTotals(transactions: Transaction[], filterMonth: string) {
  const months = filterMonth === "todos" ? MONTHS : [filterMonth];
  let totalEntrada = 0;
  let totalSaida = 0;

  for (const t of transactions) {
    const matchingMonths = t.months.filter((m) => months.includes(m));
    const count = matchingMonths.length;
    if (count > 0) {
      if (t.type === "entrada") totalEntrada += t.amount * count;
      else totalSaida += t.amount * count;
    }
  }

  return {
    totalEntrada,
    totalSaida,
    saldo: totalEntrada - totalSaida,
  };
}

export function getCategoryBreakdown(transactions: Transaction[], filterMonth: string) {
  const months = filterMonth === "todos" ? MONTHS : [filterMonth];
  const cats: Record<string, number> = {};
  for (const t of transactions) {
    if (t.type !== "saida") continue;
    const count = t.months.filter((m) => months.includes(m)).length;
    if (count > 0) {
      cats[t.category] = (cats[t.category] || 0) + t.amount * count;
    }
  }
  return Object.entries(cats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getDebtProjection(transactions: Transaction[]) {
  const monthlyData = getMonthlyData(transactions);
  let cumulativeDebt = 0;
  return monthlyData.map((d) => {
    cumulativeDebt += d.saida - d.entrada;
    if (cumulativeDebt < 0) cumulativeDebt = 0;
    return {
      label: d.label,
      month: d.month,
      divida: Math.round(cumulativeDebt * 100) / 100,
      saldoAcumulado: Math.round((cumulativeDebt === 0 ? d.entrada - d.saida : -(cumulativeDebt)) * 100) / 100,
    };
  });
}

export function getBalanceProjection(transactions: Transaction[]) {
  const monthlyData = getMonthlyData(transactions);
  let balance = 0;
  return monthlyData.map((d) => {
    balance += d.saldo;
    return {
      label: d.label,
      month: d.month,
      saldo: Math.round(balance * 100) / 100,
      entrada: d.entrada,
      saida: d.saida,
    };
  });
}
