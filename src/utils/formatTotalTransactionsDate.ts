import { isSameDay, isSameMonth, isSameYear } from "date-fns";
import { formatLastTransactionDate } from "./formatLastTransactionDate";

type MaybeDate = string | number | Date;

console.log(
  formatTotalTransactionsDate(
    new Date().setFullYear(new Date().getFullYear() - 1),
    new Date(),
  ),
);

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

  if (isSameYear(minDate, maxDate)) {
    if (isSameDay(minDate, maxDate)) {
      // Exemplo: 5 de julho de 2022
      return formatLastTransactionDate(minDate);
    }

    if (isSameMonth(minDate, maxDate)) {
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
