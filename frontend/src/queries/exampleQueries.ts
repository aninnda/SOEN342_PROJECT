import api from "./api";
import { useQuery } from "@tanstack/react-query";

// using just wretch
export const getIndexExample = () => {
  return api.url("/hello").get().text(); // when the api returns just a string instead of a json object, we .text()
};

/**
 * Using react-query, which is a useful library for managing query states.
 */
export const useGetIndexExampleDetailed = () => {
  const query = useQuery({
    queryKey: ["get", "example"],
    queryFn: () =>
      api
        .url("/hello")
        .get()
        .text()
        .then((res) => res),
    retry: 0,
  });

  return query;
};
