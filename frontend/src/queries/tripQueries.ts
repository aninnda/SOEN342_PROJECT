import type { DetailedTripModel, TripModel } from "../models/models";
import api from "./api";

import { useQuery } from "@tanstack/react-query";

export async function createTrip(trip: TripModel) {
  const res = await api.url("/trips").post(trip).json<any>();
  if (res && res.message === "Trip successful") {
    return res;
  } else {
    throw new Error(res && res.message ? res.message : "Trip failed");
  }
}

export async function lookupTrips(identifier: string, name?: string) {
  let url = `/trips/search?identifier=${encodeURIComponent(identifier)}`;
  if (name) url += `&name=${encodeURIComponent(name)}`;

  const res = await api.url(url).get().json();
  return res as DetailedTripModel[];
}

export async function lookupTripsByTripId(tripId: string) {
  const url = `/trips/searchByTripId?tripId=${encodeURIComponent(tripId)}`;
  const res = await api.url(url).get().json();
  return res as DetailedTripModel[];
}

export const useGetAllTrips = () => {
  const query = useQuery({
    queryKey: ["get", "trips", "all"],
    queryFn: () => api.url("/trips").get().json<DetailedTripModel[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};

// useQuery versions
export const useGetTripsByTravelerId = (
  identifier: string,
  name?: string
) => {
  const url = `/trips/searchByTravelerId?travelerId=${encodeURIComponent(identifier)}${
    name ? `&name=${encodeURIComponent(name)}` : ""
  }`;

  const query = useQuery({
    queryKey: ["get", "trips", "byIdentifier", identifier],
    queryFn: () => api.url(url).get().json<DetailedTripModel[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};

export const useGetTripsByTripReference = (tripReference: string) => {
  const url = `/trips/searchById?tripReference=${encodeURIComponent(
    tripReference
  )}`;
  const query = useQuery({
    queryKey: ["get", "trips", "byTripReference", tripReference],
    queryFn: () => api.url(url).get().json<DetailedTripModel[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};
