export function formatDate(date: number | string | Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date.toLocaleDateString("pt-BR");
}
