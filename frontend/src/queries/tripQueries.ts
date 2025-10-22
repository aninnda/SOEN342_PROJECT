import api from "./api";

import { useQuery } from "@tanstack/react-query";

export type TripRequest = {
  travelerName: string;
  travelerAge: number;
  travelerIdentifier: string;
  routeIds: string[];
  tripReference?: string;
};

export async function createTrip(trip: TripRequest) {
  const res = await api.url("/trips").post(trip).json<any>();
  if (res && res.message === "Trip successful") {
    return res;
  } else {
    throw new Error(res && res.message ? res.message : "Trip failed");
  }
}

export type RouteDetails = {
  routeId: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  tripDuration: number;
};

export type TripResult = {
  ticketId: number;
  travelerName: string;
  travelerIdentifier: string;
  tripReference: string;
  routes: RouteDetails[];
};

export async function lookupTrips(identifier: string, name?: string) {
  let url = `/trips/search?identifier=${encodeURIComponent(identifier)}`;
  if (name) url += `&name=${encodeURIComponent(name)}`;

  const res = await api.url(url).get().json();
  return res as TripResult[];
}

export async function lookupTripsByTripReference(tripReference: string) {
  const url = `/trips/searchByTripReference?tripReference=${encodeURIComponent(
    tripReference
  )}`;
  const res = await api.url(url).get().json();
  return res as TripResult[];
}

export const useGetAllTrips = () => {
  const query = useQuery({
    queryKey: ["get", "trips", "all"],
    queryFn: () => api.url("/trips").get().json<TripResult[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};

// useQuery versions
export const useGetTripsByTravelerIdentifier = (
  identifier: string,
  name?: string
) => {
  const url = `/trips/search?identifier=${encodeURIComponent(identifier)}${
    name ? `&name=${encodeURIComponent(name)}` : ""
  }`;

  const query = useQuery({
    queryKey: ["get", "trips", "byIdentifier", identifier],
    queryFn: () => api.url(url).get().json<TripResult[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};

export const useGetTripByTripReference = (tripReference: string) => {
  const url = `/trips/searchByTripReference?tripReference=${encodeURIComponent(
    tripReference
  )}`;
  const query = useQuery({
    queryKey: ["get", "trips", "byTripReference", tripReference],
    queryFn: () => api.url(url).get().json<TripResult[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};
