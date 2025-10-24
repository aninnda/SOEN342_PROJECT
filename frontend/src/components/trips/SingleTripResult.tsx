import TrainIcon from "@mui/icons-material/Train";
import {
  Box,
  Card,
  CircularProgress,
  Collapse,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import type { DetailedTripModel } from "../../models/models";
import { useGetTicketsByTripId } from "../../queries/tripQueries";
import { formatDate, formatDuration } from "../../utils/dateUtils";
import { formatRouteNameList } from "../../utils/stringFormatUtils";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type Props = {
  trip: DetailedTripModel;
};
export default function SingleTripResult(props: Props) {
  const ticketsQuery = useGetTicketsByTripId(props.trip.id);
  const tickets = useMemo(() => ticketsQuery.data, [ticketsQuery.data]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const connectionName = useMemo(
    () =>
      formatRouteNameList(
        props.trip.routes.map((route) => ({
          routeId: route.routeId,
          departureCity: route.departureCity,
          arrivalCity: route.arrivalCity,
          departureTime: route.departureTime || "",
          arrivalTime: route.arrivalTime || "",
          trainType: "",
          daysOfOperation: [],
          firstClassTicketRate: 0,
          secondClassTicketRate: 0,
          tripDuration: route.tripDuration,
        }))
      ),
    [props.trip.routes]
  );

  const handleExpand = () => {
    setExpanded(!expanded);
    if (!expanded && !tickets) {
      ticketsQuery.refetch();
    }
  };

  return (
    <ListItem key={props.trip.id} alignItems="flex-start">
      <ListItemIcon>
        <IconButton onClick={handleExpand}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItemIcon>
      <Box>
        <ListItemText
          primary={connectionName}
          secondary={`${props.trip.travelers.length} traveler${
            props.trip.travelers.length !== 1 ? "s" : ""
          } | ${formatDate(props.trip.initialDepartureDate)}`}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box display="flex" gap={4}>
            <Box sx={{maxWidth: "50%"}}>
              <span>Trip ID:</span> {props.trip.id}
              <br />
              <span>Travelers:</span>{" "}
              {props.trip.travelers
                .map((t) => `${t.firstName} ${t.lastName}`)
                .join(", ")}
              <br />
              {props.trip.routes.map((route, idx) => (
                <span
                  key={route.routeId}
                  style={{ display: "block", marginBottom: 8, color: "#999" }}
                >
                  <span>Route {idx + 1}</span>
                  <br />
                  <span>Cities:</span> {route.departureCity} →{" "}
                  {route.arrivalCity}
                  <br />
                  <span>Departure:</span> {route.departureTime} &nbsp;{" "}
                  <span>Arrival:</span> {route.arrivalTime}
                  <br />
                  <span>Duration:</span> {formatDuration(route.tripDuration)}
                </span>
              ))}
            </Box>
            <Box flexDirection={"column"} gap={1} display="flex">
              <span>Tickets</span>
              {ticketsQuery.isLoading ? (
                <CircularProgress />
              ) : (
                <Box flexDirection={"row"} display="flex" gap={1}>
                  {tickets?.map((ticket) => (
                    <Card sx={{p:2}} key={ticket.id}>
                      <Typography variant="body1">
                        Ticket ID: {ticket.id}
                      </Typography>
                      <Typography variant="body1">
                        {ticket.traveler.firstName} {ticket.traveler.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(ticket.issuedAt)}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </ListItem>
  );
}
