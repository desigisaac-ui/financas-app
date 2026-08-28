import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MONTHS, MONTH_LABELS } from "@/lib/data";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function MonthFilter({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Filtrar mês" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos os meses</SelectItem>
        {MONTHS.map((m, i) => (
          <SelectItem key={m} value={m}>{MONTH_LABELS[i]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
