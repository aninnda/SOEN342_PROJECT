import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Chip,
  Typography,
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useGetTrainTypes } from '../queries/searchQueries';

// Define the search filter interface
interface SearchFilters {
  departureCity?: string;
  arrivalCity?: string;
  departureTime?: string;
  arrivalTime?: string;
  trainType?: string;
  maxFirstClassPrice?: number;
  maxSecondClassPrice?: number;
  dayOfWeek?: string;
}

interface SearchChip {
  id: string;
  label: string;
  value: string;
  category: keyof SearchFilters;
}

interface SearchInterfaceProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}

const DAYS_OF_WEEK = [
  'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 
  'FRIDAY', 'SATURDAY', 'SUNDAY'
];

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch, onClear }) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const trainTypesQuery = useGetTrainTypes();
  const [chips, setChips] = useState<SearchChip[]>([]);
  const [departureCities, setDepartureCities] = useState<string[]>([]);
  const [arrivalCities, setArrivalCities] = useState<string[]>([]);

  // Fetch city suggestions
  useEffect(() => {
    // Fetch all cities for autocomplete
    fetch('http://localhost:8080/cities')
      .then(response => response.json())
      .then(cities => {
        setDepartureCities(cities);
        setArrivalCities(cities);
      })
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const addChip = (category: keyof SearchFilters, value: string, displayLabel?: string) => {
    if (!value || value.trim() === '') return;

    const chipId = `${category}-${Date.now()}`;
    const label = displayLabel || `${category}: ${value}`;
    
    const newChip: SearchChip = {
      id: chipId,
      label,
      value,
      category
    };

    // Remove existing chip of same category if exists
    const filteredChips = chips.filter(chip => chip.category !== category);
    setChips([...filteredChips, newChip]);
    
    // Update filters
    setFilters(prev => ({
      ...prev,
      [category]: (category === 'maxFirstClassPrice' || category === 'maxSecondClassPrice') ? parseInt(value) : value
    }));
  };

  const removeChip = (chipId: string) => {
    const chipToRemove = chips.find(chip => chip.id === chipId);
    if (chipToRemove) {
      setChips(chips.filter(chip => chip.id !== chipId));
      
      // Remove from filters
      const newFilters = { ...filters };
      delete newFilters[chipToRemove.category];
      setFilters(newFilters);
    }
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setChips([]);
    setFilters({});
    onClear();
  };



  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Search Train Connections
      </Typography>
      
      {/* Search Filters */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Row 1: Cities */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Autocomplete
              freeSolo
              options={departureCities}
              renderInput={(params) => (
                <TextField {...params} label="Departure City" variant="outlined" />
              )}
              onChange={(_, value) => {
                if (value) addChip('departureCity', value, `From: ${value}`);
              }}
              onInputChange={(_, value) => {
                if (value && value.length > 2) {
                  // Fetch departure city suggestions
                  fetch(`http://localhost:8080/suggestions/departure-cities?q=${value}`)
                    .then(response => response.json())
                    .then(cities => setDepartureCities(cities))
                    .catch(error => console.error('Error fetching departure cities:', error));
                }
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Autocomplete
              freeSolo
              options={arrivalCities}
              renderInput={(params) => (
                <TextField {...params} label="Arrival City" variant="outlined" />
              )}
              onChange={(_, value) => {
                if (value) addChip('arrivalCity', value, `To: ${value}`);
              }}
              onInputChange={(_, value) => {
                if (value && value.length > 2) {
                  // Fetch arrival city suggestions
                  fetch(`http://localhost:8080/suggestions/arrival-cities?q=${value}`)
                    .then(response => response.json())
                    .then(cities => setArrivalCities(cities))
                    .catch(error => console.error('Error fetching arrival cities:', error));
                }
              }}
            />
          </Box>
        </Box>

        {/* Row 2: Times and Train Type */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ minWidth: '200px' }}>
            <TextField
              fullWidth
              type="time"
              label="Departure Time"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                if (e.target.value) addChip('departureTime', e.target.value, `Depart After: ${e.target.value}`);
              }}
            />
          </Box>

          <Box sx={{ minWidth: '200px' }}>
            <TextField
              fullWidth
              type="time"
              label="Arrival Time"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                if (e.target.value) addChip('arrivalTime', e.target.value, `Arrive Before: ${e.target.value}`);
              }}
            />
          </Box>

          <Box sx={{ minWidth: '200px' }}>
            <FormControl fullWidth>
              <InputLabel>Train Type</InputLabel>
              <Select
                label="Train Type"
                disabled={trainTypesQuery.isLoading}
                onChange={(e: SelectChangeEvent) => {
                  if (e.target.value) addChip('trainType', e.target.value, `Train: ${e.target.value}`);
                }}
              >
                {trainTypesQuery.isSuccess && trainTypesQuery.data ? 
                  trainTypesQuery.data.map((type: string) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  )) : 
                  <MenuItem disabled>Loading train types...</MenuItem>
                }
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Row 3: Prices and Day */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ minWidth: '200px' }}>
            <TextField
              fullWidth
              type="number"
              label="Max First Class Price (€)"
              inputProps={{ min: 0 }}
              onChange={(e) => {
                if (e.target.value) addChip('maxFirstClassPrice', e.target.value, `Max 1st Class: €${e.target.value}`);
              }}
            />
          </Box>

          <Box sx={{ minWidth: '200px' }}>
            <TextField
              fullWidth
              type="number"
              label="Max Second Class Price (€)"
              inputProps={{ min: 0 }}
              onChange={(e) => {
                if (e.target.value) addChip('maxSecondClassPrice', e.target.value, `Max 2nd Class: €${e.target.value}`);
              }}
            />
          </Box>

          <Box sx={{ minWidth: '200px' }}>
            <FormControl fullWidth>
              <InputLabel>Day of Week</InputLabel>
              <Select
                label="Day of Week"
                onChange={(e: SelectChangeEvent) => {
                  if (e.target.value) addChip('dayOfWeek', e.target.value, `Day: ${e.target.value}`);
                }}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day.charAt(0) + day.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Selected Filters (Chips) */}
      {chips.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Selected Filters:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {chips.map((chip) => (
              <Chip
                key={chip.id}
                label={chip.label}
                onDelete={() => removeChip(chip.id)}
                color="primary"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearch}
          size="large"
          disabled={chips.length === 0}
        >
          Search Connections
        </Button>
        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={handleClear}
          size="large"
        >
          Clear All
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchInterface;