export default function formatDate(isoDateString: string): string {
  const date: Date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return date.toLocaleString("pt-BR", options);
}
