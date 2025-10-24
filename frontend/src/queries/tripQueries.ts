import type {
  DetailedTripModel,
  TicketModel,
  TripCreationResponse,
  TripModel,
} from "../models/models";
import api from "./api";

import { useMutation, useQuery } from "@tanstack/react-query";

export async function createTrip(trip: TripModel) {
  const res = await api.url("/trips").post(trip).json<any>();
  if (res && res.message === "Trip created successfully") {
    return res;
  } else {
    throw new Error(res && res.message ? res.message : "Trip failed");
  }
}

export const useCreateTrip = () => {
  const mutation = useMutation({
    mutationFn: (trip: TripModel) =>
      api.url("/trips").post(trip).json<TripCreationResponse>(),
    onSuccess: (data) => {
      console.log("Trip created successfully:", data);
      return data;
    },
    onError: (error: any) => {
      console.error("Booking error:", error);
    },
  });
  return mutation;
};

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
  lastName: string
) => {
  const url = `/trips/searchByTravelerId?travelerId=${encodeURIComponent(
    identifier
  )}&lastName=${encodeURIComponent(lastName)}`;

  const query = useQuery({
    queryKey: ["get", "trips", "byIdentifier", identifier],
    queryFn: () => api.url(url).get().json<DetailedTripModel[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};

export const useGetTripsByTripReference = (tripId: number) => {
  const url = `/trips/searchById?tripReference=${encodeURIComponent(tripId)}`;
  const query = useQuery({
    queryKey: ["get", "trips", "byTripReference", tripId],
    queryFn: () => api.url(url).get().json<DetailedTripModel[]>(),
    enabled: false, // disables automatic fetching, must be called via .refetch();
  });
  return query;
};

export const useGetTicketsByTripId = (tripId: number) => {
  const url = `/tickets/search?tripId=${encodeURIComponent(tripId)}`;
  const query = useQuery({
    queryKey: ["get", "tickets", "byTripId", tripId],
    queryFn: () => api.url(url).get().json<TicketModel[]>(),
    enabled: false,
  });
  return query;
};
