import type { RouteModel } from "../models/models";

export function formatRouteNameList(routes: RouteModel[]): string {
  const cities = new Set<string>(routes.map((r) => r.departureCity));

  if (routes.length > 0) {
    cities.add(routes[routes.length - 1].arrivalCity);
  }

  return Array.from(cities).join(" - ");
}
