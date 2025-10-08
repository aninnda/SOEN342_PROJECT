import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ConnectionTable from "../components/tables/ConnectionTable";
import SearchInterface from "../components/searchFilters/SearchInterface";
import type { SearchFilters } from "../models/models";

/**
 * Main view that combines search interface with results table
 */
export default function IndexView() {
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Choose your next travel destination!
      </Typography>
      
      <SearchInterface onSearch={handleSearch} onClear={handleClear} />
      
      {hasSearched && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <ConnectionTable searchFilters={searchFilters} />
        </Box>
      )}
    </Box>
  );
}
