export interface Transaction {
  id: string;
  type: "entrada" | "saida";
  description: string;
  amount: number;
  months: string[];
  category: string;
}

export const MONTHS = [
  "jan/2026","fev/2026","mar/2026","abr/2026","mai/2026","jun/2026",
  "jul/2026","ago/2026","set/2026","out/2026","nov/2026","dez/2026",
  "jan/2027","fev/2027","mar/2027","abr/2027","mai/2027","jun/2027",
  "jul/2027","ago/2027","set/2027","out/2027","nov/2027","dez/2027",
];

export const MONTH_LABELS = [
  "Jan 26","Fev 26","Mar 26","Abr 26","Mai 26","Jun 26",
  "Jul 26","Ago 26","Set 26","Out 26","Nov 26","Dez 26",
  "Jan 27","Fev 27","Mar 27","Abr 27","Mai 27","Jun 27",
  "Jul 27","Ago 27","Set 27","Out 27","Nov 27","Dez 27",
];

export const CATEGORIES = [
  "Telecomunicações","Igreja","Transporte","Alimentação",
  "Viagem","Emergência","Saúde","Cartão de Crédito","Outros","Salário","Renda Extra"
];

function mkId(): string {
  return Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4);
}

export function newId(): string { return mkId(); }

const dia1Income = [2879.01,7929,2765,2853.13,3500,3100,2027.37,900,4360,4360,4360,4360,4360,4360,4360,4360,4360,4360,4360,4360,4360,4360,4360,4360];
const dia15Income = [1736,1736,1736,1740,1740,2140,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740,1740];

interface RawItem { n:string; c:string; v:number[] }

const dia1Items: RawItem[] = [
  {n:"Internet dos Cria",c:"Telecomunicações",v:[85.10,85.10,85.10,85.10,85.10,85.10,85.10,62.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90,129.90]},
  {n:"Claro Celular",c:"Telecomunicações",v:[51.92,51.92,51.92,39.90,36.43,36.43,36.43,91.16,119.92,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16,41.16]},
  {n:"Dízimo",c:"Igreja",v:[0,0,0,285.31,350,0,0,0,436,436,436,436,436,436,436,436,436,436,436,436,436,436,436,436]},
  {n:"Pertence a Mim",c:"Igreja",v:[287.90,0,0,285.31,350,0,0,0,0,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90,350.90]},
  {n:"Mercado",c:"Alimentação",v:[0,0,0,1100,1100,1100,0,0,0,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000]},
  {n:"Viagem Chile",c:"Viagem",v:[0,0,0,0,0,0,0,0,0,500,500,0,500,500,500,500,500,500,500,500,500,500,500,500]},
  {n:"Reserva Emergência",c:"Emergência",v:[0,0,0,0,0,0,0,0,0,872,872,0,872,872,872,872,872,872,872,872,872,872,872,872]},
  {n:"Cartão Passagem",c:"Transporte",v:[0,0,0,0,0,0,0,0,0,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]},
  {n:"Thor (Saúde Pet)",c:"Saúde",v:[0,0,0,0,0,0,0,0,0,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300]},
  {n:"Cartão Picpay",c:"Cartão de Crédito",v:[0,0,0,0,0,0,0,262.01,1967.57,315.27,315.27,215.27,215.27,112.50,112.50,0,0,0,0,0,0,0,0,0]},
  {n:"Lojas Renner",c:"Cartão de Crédito",v:[0,0,0,0,0,0,0,143.81,203.45,89.90,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  {n:"Passaí Card",c:"Cartão de Crédito",v:[0,0,0,0,0,0,0,0,700,691.90,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  {n:"Cartão Itaú",c:"Cartão de Crédito",v:[0,0,0,0,0,0,0,180.43,1604.79,799.12,810.92,0,0,0,0,0,0,0,0,0,0,0,0,0]},
];

const dia15Items: RawItem[] = [
  {n:"Dízimo (Dia 15)",c:"Igreja",v:[173.60,0,0,174,174,0,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174]},
  {n:"Passagem Mãe",c:"Transporte",v:[80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]},
  {n:"Pertence a Mim (Dia 15)",c:"Igreja",v:[173.60,0,0,174,174,214,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174]},
  {n:"Viagem Cartão Matheus",c:"Viagem",v:[0,0,0,194.75,194.75,194.75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  {n:"Picpay (Dia 15)",c:"Cartão de Crédito",v:[0,0,0,0,753.01,1655.59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  {n:"Cartão Renner (Dia 15)",c:"Cartão de Crédito",v:[0,0,0,0,85.12,85.12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
];

export function buildInitialTransactions(): Transaction[] {
  const txns: Transaction[] = [];

  // Group same-value income entries across months
  for (let i = 0; i < 24; i++) {
    if (dia1Income[i] > 0) {
      const ex = txns.find(t => t.description === "Salário (Dia 1)" && t.amount === dia1Income[i]);
      if (ex) { ex.months.push(MONTHS[i]); }
      else { txns.push({ id: mkId(), type: "entrada", description: "Salário (Dia 1)", amount: dia1Income[i], months: [MONTHS[i]], category: "Salário" }); }
    }
    if (dia15Income[i] > 0) {
      const ex = txns.find(t => t.description === "Adiantamento (Dia 15)" && t.amount === dia15Income[i]);
      if (ex) { ex.months.push(MONTHS[i]); }
      else { txns.push({ id: mkId(), type: "entrada", description: "Adiantamento (Dia 15)", amount: dia15Income[i], months: [MONTHS[i]], category: "Salário" }); }
    }
  }

  const addItems = (items: RawItem[]) => {
    for (const item of items) {
      for (let i = 0; i < 24; i++) {
        const v = item.v[i];
        if (v > 0) {
          const ex = txns.find(t => t.type === "saida" && t.description === item.n && t.amount === v);
          if (ex) { ex.months.push(MONTHS[i]); }
          else { txns.push({ id: mkId(), type: "saida", description: item.n, amount: v, months: [MONTHS[i]], category: item.c }); }
        }
      }
    }
  };

  addItems(dia1Items);
  addItems(dia15Items);
  return txns;
}
