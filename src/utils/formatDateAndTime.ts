export function formatDateAndTimeEN(isoDateString: string): string {
  const date: Date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",

    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,

    timeZone: "UTC",
  };

  return date.toLocaleString("en-US", options);
}

export function formatDateAndTimeBR(isoDateString: string): string {
  const date: Date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",

    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,

    timeZone: "UTC",
  };

  return date.toLocaleString("pt-BR", options);
}
