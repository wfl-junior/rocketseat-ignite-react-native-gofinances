import { formatLastTransactionDate } from "./formatLastTransactionDate";

type MaybeDate = string | number | Date;

export function formatTotalTransactionsDate(
  minDate: MaybeDate,
  maxDate: MaybeDate,
) {
  if (!(minDate instanceof Date)) {
    minDate = new Date(minDate);
  }

  if (!(maxDate instanceof Date)) {
    maxDate = new Date(maxDate);
  }

  const isSameYear = minDate.getFullYear() === maxDate.getFullYear();

  if (isSameYear) {
    const isSameDay =
      new Date(minDate).setHours(0, 0, 0, 0) ===
      new Date(maxDate).setHours(0, 0, 0, 0);

    if (isSameDay) {
      // Exemplo: 5 de julho de 2022
      return formatLastTransactionDate(minDate);
    }

    const isSameMonth = minDate.getMonth() === maxDate.getMonth();

    if (isSameMonth) {
      // Exemplo: De 1 à 5 de julho de 2022
      return `De ${minDate.getDate()} à ${formatLastTransactionDate(maxDate)}`;
    }

    // Exemplo: De 1 de maio à 5 de julho de 2022
    return `De ${formatLastTransactionDate(
      minDate,
      false,
    )} à ${formatLastTransactionDate(maxDate)}`;
  }

  // Exemplo: De 1 de maio de 2021 à 5 de julho de 2022
  return `De ${formatLastTransactionDate(
    minDate,
  )} à ${formatLastTransactionDate(maxDate)}`;
}
