import { ArrowDropDown, Clear, Search } from "@mui/icons-material";
import type { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { Dayjs } from "dayjs";
import { useMemo, useReducer } from "react";
import type { SearchFilters } from "../../models/models";
import { useGetCities, useGetTrainTypes } from "../../queries/searchQueries";
import { WrappedNumberInput } from "./WrappedNumberInput";
import { WrappedAutocomplete } from "./WrappedAutocomplete";
import WrappedTimeField from "./WrappedTimeField";
// Define the search filter interface

interface SearchInterfaceProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  // optional element to render to the right of the title (e.g., 'View Trip' button)
  rightAction?: React.ReactNode;
}

const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

function SearchInterface(props: SearchInterfaceProps) {
  const initialFilters: SearchFilters = {
    departureCity: "",
    arrivalCity: "",
    departureTime: null,
    arrivalTime: null,
    trainType: "",
    maxFirstClassPrice: undefined,
    maxSecondClassPrice: undefined,
    dayOfWeek: null,
  };

  const reducer = (
    state: SearchFilters,
    action: { type: string; payload?: any }
  ) => {
    switch (action.type) {
      case "departureCity":
        return { ...state, departureCity: action.payload };
      case "arrivalCity":
        return { ...state, arrivalCity: action.payload };
      case "departureTime":
        return { ...state, departureTime: action.payload };
      case "arrivalTime":
        return { ...state, arrivalTime: action.payload };
      case "trainType":
        return { ...state, trainType: action.payload };
      case "maxFirstClassPrice":
        return { ...state, maxFirstClassPrice: action.payload };
      case "maxSecondClassPrice":
        return { ...state, maxSecondClassPrice: action.payload };
      case "dayOfWeek":
        return { ...state, dayOfWeek: action.payload };
      case "clear":
        return initialFilters;
      default:
        return state;
    }
  };
  const [filters, dispatch] = useReducer(reducer, initialFilters);
  const trainTypesQuery = useGetTrainTypes();
  const citiesQuery = useGetCities();
  const trainTypes = useMemo(() => trainTypesQuery.data || [], [trainTypesQuery.data]);
  const cities = useMemo(() => citiesQuery.data || [], [citiesQuery.data]);

  const isSearchEnabledFromFailedQuery =
    !citiesQuery.isSuccess &&
    (!!filters.arrivalCity || !!filters.departureCity);

  const areCityFiltersValid =
    cities.some((city: string) => city.toLowerCase() === filters.departureCity?.toLowerCase()) ||
    cities.some((city: string) => city.toLowerCase() === filters.arrivalCity?.toLowerCase());

  const areDestinationAndOriginIdentical =
    filters.departureCity?.toLowerCase() === filters.arrivalCity?.toLowerCase();

  const isSearchDisabled =
    areDestinationAndOriginIdentical ||
    (!isSearchEnabledFromFailedQuery && !areCityFiltersValid);

  const handleSearch = () => {
    props.onSearch(filters);
  };

  const handleClear = () => {
    dispatch({ type: "clear" });
    props.onClear();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" gutterBottom>
          Search Train Connections
        </Typography>
        {props.rightAction && <Box>{props.rightAction}</Box>}
      </Box>

      {/* Search Filters */}
      <Grid container spacing={3} sx={{ maxWidth: "85vw" }}>
        {/* Row 1: Cities */}
        <Grid container size={12}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <WrappedAutocomplete
              value={filters.departureCity || ""}
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Departure City"
                  variant="outlined"
                />
              )}
              parentOnChange={(value) => {
                dispatch({ type: "departureCity", payload: value });
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <WrappedAutocomplete
              freeSolo
              value={filters.arrivalCity || ""}
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Arrival City"
                  variant="outlined"
                />
              )}
              parentOnChange={(value) => {
                dispatch({ type: "arrivalCity", payload: value });
              }}
            />
          </Grid>
        </Grid>

        {/* Row 2: Times and Train Type */}
        <Grid container size={12}>
          <Grid container size={{ xs: 12, sm: 8 }}>
            <Grid size={6}>
              <WrappedTimeField
                value={filters.departureTime ?? null}
                fullWidth
                ampm={false}
                label="Departure Time"
                error={
                  !!filters.departureTime && !filters.departureTime.isValid()
                }
                parentOnChange={(newTime: Dayjs | null) => {
                  dispatch({ type: "departureTime", payload: newTime });
                }}
              />
            </Grid>
            <Grid size={6}>
              <WrappedTimeField
                value={filters.arrivalTime ?? null}
                fullWidth
                ampm={false}
                label="Arrival Time"
                error={!!filters.arrivalTime && !filters.arrivalTime.isValid()}
                parentOnChange={(newTime: Dayjs | null) => {
                  dispatch({ type: "arrivalTime", payload: newTime });
                }}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Train Type</InputLabel>
              <Select
                IconComponent={(props) => {
                  return filters.trainType ? (
                    <IconButton>
                      <Clear
                        onClick={() => {
                          dispatch({ type: "trainType", payload: null });
                        }}
                      />
                    </IconButton>
                  ) : (
                    <ArrowDropDown {...props} />
                  );
                }}
                label="Train Type"
                value={filters.trainType ?? ""}
                disabled={trainTypesQuery.isLoading}
                onChange={(e: SelectChangeEvent) => {
                  if (e.target.value)
                    dispatch({ type: "trainType", payload: e.target.value });
                }}
              >
                {trainTypesQuery.isSuccess && trainTypes?.length > 0 ? (
                  trainTypes.map((type: string) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading train types...</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Row 3: Prices and Day */}
        <Grid container size={12}>
          <Grid container size={{ xs: 12, sm: 8 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <WrappedNumberInput
                value={filters.maxFirstClassPrice || ""}
                type="number"
                label="Max First Class Price (€)"
                slotProps={{ htmlInput: { min: 0 } }}
                parentOnChange={(value) => {
                  dispatch({
                    type: "maxFirstClassPrice",
                    payload: value,
                  });
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <WrappedNumberInput
                value={filters.maxSecondClassPrice || ""}
                type="number"
                label="Max Second Class Price (€)"
                slotProps={{ htmlInput: { min: 0 } }}
                parentOnChange={(value) => {
                  dispatch({
                    type: "maxSecondClassPrice",
                    payload: value,
                  });
                }}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Day of Week</InputLabel>
              <Select
                IconComponent={(props) => {
                  return filters.dayOfWeek ? (
                    <IconButton>
                      <Clear
                        onClick={() => {
                          dispatch({ type: "dayOfWeek", payload: null });
                        }}
                      />
                    </IconButton>
                  ) : (
                    <ArrowDropDown {...props} />
                  );
                }}
                value={filters.dayOfWeek ?? ""}
                label="Day of Week"
                onChange={(e: SelectChangeEvent) => {
                  if (e.target.value)
                    dispatch({ type: "dayOfWeek", payload: e.target.value });
                }}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day.charAt(0) + day.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearch}
          size="large"
          disabled={isSearchDisabled}
        >
          Search Connections
        </Button>
        <Button
          disabled={JSON.stringify(filters) === JSON.stringify(initialFilters)}
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
}

export default SearchInterface;
