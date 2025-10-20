import api from "./api";
import type { } from "../models/models";

export type RouteDetails = {
  routeId: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  tripDuration: number;
};

export type BookingResult = {
  ticketId: number;
  passengerName: string;
  passengerIdentifier: string;
  tripReference: string;
  routes: RouteDetails[];
};

export async function lookupBookings(identifier: string, name?: string) {
  let url = `/bookings/search?identifier=${encodeURIComponent(identifier)}`;
  if (name) url += `&name=${encodeURIComponent(name)}`;

  const res = await api.url(url).get().json();
  return res as BookingResult[];
}

export async function lookupBookingsByTripReference(tripReference: string) {
  const url = `/bookings/searchByTripReference?tripReference=${encodeURIComponent(tripReference)}`;
  const res = await api.url(url).get().json();
  return res as BookingResult[];
}
