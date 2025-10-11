import { useQuery } from "@tanstack/react-query";
import api from "./api";
import type { SearchResponseModel } from "../models/responseModels";
import dayjs from "dayjs";
import type { SearchFilters } from "../models/models";

// TODO add pagination
export const useGetAllConnections = () => {
  const query = useQuery({
    queryKey: ["get", "connections"],
    queryFn: () =>
      api
        .url("/search")
        .get()
        .json<SearchResponseModel>()
        .then((res) => res),
    retry: 1,
  });

  return query;
};

// New search query with filters
export const useSearchConnections = (
  filters: SearchFilters,
  enabled: boolean = true
) => {
  const query = useQuery({
    queryKey: ["search", "connections", filters],
    queryFn: () => {
      // Build query parameters
      const params = new URLSearchParams();

      if (filters.departureCity)
        params.append("departureCity", filters.departureCity);
      if (filters.arrivalCity)
        params.append("arrivalCity", filters.arrivalCity);
      if (filters.departureTime)
        params.append(
          "departureTime",
          dayjs(filters.departureTime).format("HH:mm")
        );
      if (filters.arrivalTime)
        params.append(
          "arrivalTime",
          dayjs(filters.arrivalTime).format("HH:mm")
        );
      if (filters.trainType) params.append("trainType", filters.trainType);
      if (filters.maxFirstClassPrice)
        params.append(
          "maxFirstClassPrice",
          filters.maxFirstClassPrice.toString()
        );
      if (filters.maxSecondClassPrice)
        params.append(
          "maxSecondClassPrice",
          filters.maxSecondClassPrice.toString()
        );
      if (filters.dayOfWeek) params.append("dayOfWeek", filters.dayOfWeek);

      return api
        .url(`/search${params.toString() ? `?${params.toString()}` : ""}`)
        .get()
        .json<SearchResponseModel>()
        .then((res) => res);
    },
    retry: 1,
    enabled: enabled,
  });

  return query;
};

// Hook to fetch all available train types
export const useGetTrainTypes = () => {
  const query = useQuery({
    queryKey: ["get", "train-types"],
    queryFn: () =>
      api
        .url("/suggestions/train-types")
        .get()
        .json<string[]>()
        .then((res) => res),
    retry: 1,
  });

  return query;
};

// Hook to fetch all cities for autocomplete
export const useGetCities = () => {
  const query = useQuery({
    queryKey: ["get", "cities"],
    queryFn: () =>
      api
        .url("/cities")
        .get()
        .json<string[]>()
        .then((res) => res),
    retry: 1,
  });

  return query;
};
