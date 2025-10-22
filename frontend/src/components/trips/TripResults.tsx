import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  debounce,
} from "@mui/material";
import { useGetBookingsByTravelerIdentifier } from "../../queries/bookingLookupApi";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { formatDuration } from "../../utils/dateUtils";

type Props = {
  searchOptions: {
    identifier: string;
    name: string;
    tripReference: string;
  };
};

export function TripResults({ searchOptions }: Props) {
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const byIdentifierQuery = useGetBookingsByTravelerIdentifier(
    searchOptions.identifier,
    searchOptions.name
  );

  const byReferenceQuery = useGetBookingsByTravelerIdentifier(
    searchOptions.tripReference
  );

  const data = useMemo(() => {
    return searchOptions.tripReference
      ? byReferenceQuery.data
      : byIdentifierQuery.data;
  }, [
    byReferenceQuery.data,
    byIdentifierQuery.data,
    searchOptions.tripReference,
  ]);

  const debouncedRefetch = debounce(() => {
    if (searchOptions.tripReference) {
      byReferenceQuery.refetch();
    } else {
      byIdentifierQuery.refetch();
    }
  }, 1000); // Adjust debounce time as needed
  useEffect(() => {
    setIsSearching(true);

    debouncedRefetch();

    return () => {
      debouncedRefetch.clear();
      setIsSearching(false);
    };
  }, [searchOptions, byReferenceQuery, byIdentifierQuery]);

  const isLoading =
    (isSearching && !data) ||
    byIdentifierQuery.isLoading ||
    byReferenceQuery.isLoading;

  return (
    <Box sx={{ p: 1, minHeight: 200 }}>
      {isLoading && (
        <CircularProgress sx={{ display: "flex", justifySelf: "center" }} />
      )}
      <List>
        {byIdentifierQuery.isLoading || byReferenceQuery.isLoading ? (
          <ListItem>
            <ListItemText primary="Loading..." />
          </ListItem>
        ) : (
          data?.map((item) => (
            <ListItem key={item.ticketId} alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    <strong>Ticket ID:</strong> {item.ticketId}
                    <br />
                    <strong>Name:</strong> {item.travelerName}
                    <br />
                    <strong>Identifier:</strong> {item.travelerIdentifier}
                    <br />
                    <strong>Trip Reference:</strong> {item.tripReference}
                  </>
                }
                secondary={
                  <>
                    {item.routes.map((route, idx) => (
                      <span
                        key={route.routeId}
                        style={{ display: "block", marginBottom: 8 }}
                      >
                        <strong>Route {idx + 1}</strong>
                        <br />
                        <strong>Cities:</strong> {route.departureCity} →{" "}
                        {route.arrivalCity}
                        <br />
                        <strong>Departure:</strong> {route.departureTime} &nbsp;{" "}
                        <strong>Arrival:</strong> {route.arrivalTime}
                        <br />
                        <strong>Duration:</strong>{" "}
                        {formatDuration(route.tripDuration)}
                      </span>
                    ))}
                  </>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
