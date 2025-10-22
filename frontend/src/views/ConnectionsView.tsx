import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ViewTripModal from "../components/ViewTripModal";
import ConnectionTable from "../components/tables/ConnectionTable";
import SearchInterface from "../components/searchFilters/SearchInterface";
import type { SearchFilters } from "../models/models";

/**
 * Main view that combines search interface with results table
 */
export default function ConnectionsView() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    setHasSearched(true);
  };

  const handleClear = () => {
    setSearchFilters({});
    setHasSearched(false);
  };

  const [viewOpen, setViewOpen] = useState(false);

  const openView = () => setViewOpen(true);
  const closeView = () => setViewOpen(false);

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!hasSearched && (
        <Typography variant="h3" align="center" gutterBottom>
          Choose your next travel destination!
        </Typography>
      )}

      <SearchInterface
        onSearch={handleSearch}
        onClear={handleClear}
        rightAction={
          <Button variant="outlined" onClick={openView}>
            View Trip
          </Button>
        }
      />

      {hasSearched && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <ConnectionTable searchFilters={searchFilters} />
        </Box>
      )}


      {/* there's also a dedicated view for trip viewing. see TripsView */}
      <ViewTripModal open={viewOpen} onClose={closeView} />
    </Box>
  );
}
