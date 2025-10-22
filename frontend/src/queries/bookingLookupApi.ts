import api from "./api";
import type {} from "../models/models";
import { useQuery } from "@tanstack/react-query";

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
  travelerName: string;
  travelerIdentifier: string;
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
  const url = `/bookings/searchByTripReference?tripReference=${encodeURIComponent(
    tripReference
  )}`;
  const res = await api.url(url).get().json();
  return res as BookingResult[];
}

export const useGetAllBookings = () => {
  const query = useQuery({
    queryKey: ["get", "bookings"],
    queryFn: () => api.url("/bookings").get().json(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};
