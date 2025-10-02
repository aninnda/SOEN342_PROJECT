const DayOfOperation = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
} as const;

export type DayOfOperation =
  (typeof DayOfOperation)[keyof typeof DayOfOperation];

const daysOfOperationFullNames: Record<DayOfOperation, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export function getDisplayNameForDaysOfOperation(days: string): string {
  if (["Never", "Daily"].includes(days)) return days;
  const displayName = days
    .replace(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/g, (match) => {
      return daysOfOperationFullNames[match as DayOfOperation];
    })
    .replace(/,/g, ", ")
    .replace(/-/g, " - ");
  return displayName;
}
