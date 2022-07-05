export function formatDate(date: string | Date): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return date.toLocaleDateString("pt-BR");
}
