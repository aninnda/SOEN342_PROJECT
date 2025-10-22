import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { type TripResult } from "../../queries/tripQueries";
import { formatDuration } from "../../utils/dateUtils";
import { useState } from "react";

type Props = {
  results: TripResult[] | undefined;
  isLoading?: boolean;
};

export function TripResults(props: Props) {

  return (
    <Box sx={{ p: 1, minHeight: 260 }}>
      {props.isLoading ? (
        <CircularProgress sx={{ display: "flex", justifySelf: "center" }} />
      ) : (
        !props.results?.length && <Typography>No trips found.</Typography>
      )}
      <List>
        {props.results?.map((item) => (
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
        ))}
      </List>
    </Box>
  );
}
