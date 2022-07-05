const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatAmount(amount: number): string {
  return formatter.format(amount);
}
