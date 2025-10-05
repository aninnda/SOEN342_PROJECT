import { useQuery } from "@tanstack/react-query";
import api from "./api";
import type { ConnectionModel } from "../models/models";

// TODO add pagination
export const useGetAllConnections = () => {
  const query = useQuery({
    queryKey: ["get", "connections"],
    queryFn: () =>
      api
        .url("/search")
        .get()
        .json<ConnectionModel[]>()
        .then((res) => res),
    retry: 1,
  });

  return query;
};
