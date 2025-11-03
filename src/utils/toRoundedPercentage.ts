export function toRoundedPercentage(value: number): string | number {
  if (isNaN(value)) {
    console.error("Input is not a valid number.");
    return NaN;
  }

  const roundedValue = Math.round(value * 10);
  const finalValue = (roundedValue / 10).toFixed(1);
  return finalValue;
}
