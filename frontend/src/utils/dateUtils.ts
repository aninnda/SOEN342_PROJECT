import dayjs, { Dayjs } from "dayjs";
import type { DayOfWeek } from "../models/models";

export function toIndex(day: String): number {
  switch (day) {
    case "MONDAY":
      return 0;
    case "TUESDAY":
      return 1;
    case "WEDNESDAY":
      return 2;
    case "THURSDAY":
      return 3;
    case "FRIDAY":
      return 4;
    case "SATURDAY":
      return 5;
    case "SUNDAY":
      return 6;
    default:
      return -1;
  }
}

export function getDisplayNameForDaysOfOperation(days: DayOfWeek[]): string {
  if (days.length === 7) {
    return "Daily";
  }

  const indices = days.map(toIndex).sort((a, b) => a - b);
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const ranges: string[] = [];
  let start = indices[0];

  for (let i = 1; i <= indices.length; i++) {
    const prev = indices[i - 1];
    const curr = indices[i % indices.length];

    if (curr !== (prev + 1) % 7 || i === indices.length) {
      const end = prev;
      if (start === end) {
        ranges.push(dayNames[start]);
      } else if (start + 1 === end) {
        ranges.push(`${dayNames[start]}, ${dayNames[end]}`);
      } else {
        ranges.push(`${dayNames[start]} - ${dayNames[end]}`);
      }
      start = curr;
    }
  }

  return ranges.join(", ");
}

export function formatDuration(duration: number): string {
  if (duration >= 24) {
    const days = Math.floor(duration / 24);
    const hours = Math.floor(duration % 24);
    const minutes = Math.round((duration - Math.floor(duration)) * 60);
    let result = `${days}d`;
    if (hours > 0) result += ` ${hours}h`;
    if (minutes > 0) result += ` ${minutes}m`;
    return result.trim();
  }
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);
  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
}

export function formatDate(date: string | Dayjs | undefined): string {
  if (!date) return "";
  const formattedDate = dayjs(date);
  return formattedDate.format("dddd, MMMM D, YYYY");
}
