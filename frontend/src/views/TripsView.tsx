import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import { TripResults } from "../components/trips/TripResults";
import {
  useGetTripsByTravelerIdentifier,
  useGetTripsByTripReference,
} from "../queries/tripQueries";

export default function TripsView() {
  const [identifier, setIdentifier] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [tripReference, setTripReference] = useState<string>("");

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  const byIdentifierQuery = useGetTripsByTravelerIdentifier(identifier, name);

  const byReferenceQuery = useGetTripsByTripReference(tripReference);

  const currentQuery = tripReference ? byReferenceQuery : byIdentifierQuery;

  const data = useMemo(() => {
    return currentQuery.data;
  }, [currentQuery.data]);

  const isLoading =
    isSearching && (currentQuery.isLoading || currentQuery.isFetching);

  const handleSearch = () => {
    setIsSearching(true);
    setShowPlaceholder(false);
    currentQuery.refetch().finally(() => {
      setIsSearching(false);
    });
  };

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
      <Grid size={4}>
        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
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
            label="Traveler ID"
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
          <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
            Search
          </Button>
        </Paper>
      </Grid>
      <Grid size={"grow"}>
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
          {showPlaceholder ? (
            <Box>
              Enter your traveler ID or your trip reference number to view trip
              information.
            </Box>
          ) : (
            <TripResults results={data} isLoading={isLoading} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
