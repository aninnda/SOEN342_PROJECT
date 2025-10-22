import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { TripResult } from "../queries/tripQueries";
import {
  lookupTrips,
  lookupTripsByTripId,
  useGetAllTrips,
} from "../queries/tripQueries";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ViewTripModal({ open, onClose }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [tripReference, setTripReference] = useState("");
  const [results, setResults] = useState<TripResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allTripsQuery = useGetAllTrips();

  async function handleLookup() {
    setError(null);
    setResults(null);
    setLoading(true);
    try {
      let res: TripResult[] = [];
      if (tripReference) {
        res = await lookupTripsByTripId(tripReference);
      } else if (identifier) {
        res = await lookupTrips(identifier, name || undefined);
      } else {
        setError("Please enter an identifier or trip reference number.");
        setLoading(false);
        return;
      }
      setResults(res || []);
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "message" in e
          ? (e as any).message
          : null;
      setError((msg as string) || "Lookup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>View Trip</DialogTitle>
      <DialogContent>
        <TextField
          label="Identifier"
          fullWidth
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Last name (optional)"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Trip Reference Number (optional)"
          fullWidth
          value={tripReference}
          onChange={(e) => setTripReference(e.target.value)}
          margin="normal"
        />

        {error && <div style={{ color: "red" }}>{error}</div>}

        {results && (
          <div style={{ marginTop: 12 }}>
            <List>
              {results.length === 0 && (
                <ListItem>
                  <ListItemText primary="No trips found" />
                </ListItem>
              )}
              {results.map((r) => (
                <ListItem key={r.ticketId} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <>
                        <strong>Ticket ID:</strong> {r.ticketId}
                        <br />
                        <strong>Name:</strong> {r.travelerName}
                        <br />
                        <strong>Identifier:</strong> {r.travelerIdentifier}
                        <br />
                        <strong>Trip Reference:</strong> {r.tripReference}
                      </>
                    }
                    secondary={
                      <>
                        {r.routes.map((route, idx) => (
                          <div key={route.routeId} style={{ marginBottom: 8 }}>
                            <strong>Route {idx + 1}:</strong>
                            <br />
                            <strong>Cities:</strong> {route.departureCity} →{" "}
                            {route.arrivalCity}
                            <br />
                            <strong>Departure:</strong> {route.departureTime}{" "}
                            &nbsp; <strong>Arrival:</strong> {route.arrivalTime}
                            <br />
                            <strong>Duration:</strong> {route.tripDuration}h
                          </div>
                        ))}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleLookup} disabled={loading} variant="contained">
          {loading ? "Searching..." : "Search"}
        </Button>

        <Button onClick={() => allTripsQuery.refetch()}>
          just give me them all
        </Button>
      </DialogActions>
    </Dialog>
  );
}
