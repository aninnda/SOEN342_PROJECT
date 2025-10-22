import { Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { TripResults } from "../components/trips/TripResults";

/**
 * Main view that combines search interface with results table
 */
export default function TripsView() {
  const [identifier, setIdentifier] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [tripReference, setTripReference] = useState<string>("");

  return (
    <Grid
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
      container
      gap={2}
    >
      <Grid size={3}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            width: "100%",
            rowGap: 2,
          }}
        >
          <TextField
            label="Identifier"
            fullWidth
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <TextField
            label="Last name (optional)"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Trip Reference Number (optional)"
            fullWidth
            value={tripReference}
            onChange={(e) => setTripReference(e.target.value)}
          />
        </Paper>
      </Grid>
      <Grid size={"grow"}>
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
          <TripResults searchOptions={{ identifier, name, tripReference }} />
        </Paper>
      </Grid>
    </Grid>
  );
}
