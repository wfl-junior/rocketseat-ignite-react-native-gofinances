export function formatLastTransactionDate(
  date: number | string | Date,
  hasYear = true,
): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
  };

  if (hasYear) {
    options.year = "numeric";
  }

  return date.toLocaleDateString("pt-BR", options);
}
