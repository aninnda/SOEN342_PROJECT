import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { TripResults } from "../components/trips/TripResults";
import { useGetTripsByTravelerId } from "../queries/tripQueries";

export default function TripsView() {
  const [identifier, setIdentifier] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  const tripsQuery = useGetTripsByTravelerId(identifier, name);

  const data = useMemo(() => {
    return tripsQuery.data;
  }, [tripsQuery.data]);

  const isLoading =
    isSearching && (tripsQuery.isLoading || tripsQuery.isFetching);

  const handleSearch = () => {
    setIsSearching(true);
    setShowPlaceholder(false);
    tripsQuery.refetch().finally(() => {
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
            required
            label="Traveler ID"
            fullWidth
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <TextField
            required
            label="Last name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <TripResults
              results={data}
              isLoading={isLoading}
              travelerId={identifier}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
