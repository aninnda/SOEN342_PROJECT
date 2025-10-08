import { useMemo, useState } from "react";
import type { ConnectionModel, RouteModel, SearchFilters } from "../../models/models";
import { getDisplayNameForDaysOfOperation } from "../../utils/dateUtils";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  useSearchConnections,
} from "../../queries/searchQueries";
import IndirectConnectionTable from "./IndirectConnectionTable";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface ConnectionTableProps {
  searchFilters?: SearchFilters;
}

/**
 * Built using https://www.material-react-table.com/docs/getting-started/usage as reference.
 */
export default function ConnectionTable({
  searchFilters = {},
}: ConnectionTableProps) {
  const searchConnectionsQuery = useSearchConnections(searchFilters, true);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const connections = useMemo<ConnectionModel[]>(() => {
    if (searchConnectionsQuery.isSuccess && searchConnectionsQuery.data) {
      return searchConnectionsQuery.data.connections;
    } else {
      return [];
    }
  }, [searchConnectionsQuery]);

  const routes = useMemo<RouteModel[]>(() => {
    let routeList = connections.map((conn) => conn.routes[0]);

    // Apply sorting if a sort column is selected, after the user's results are fetched
    if (sortBy) {
      routeList = [...routeList].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortBy) {
          case "tripDuration":
            aValue = a.tripDuration;
            bValue = b.tripDuration;
            break;
          case "firstClassTicketRate":
            aValue = a.firstClassTicketRate;
            bValue = b.firstClassTicketRate;
            break;
          case "secondClassTicketRate":
            aValue = a.secondClassTicketRate;
            bValue = b.secondClassTicketRate;
            break;
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    return routeList;
  }, [connections, sortBy, sortOrder]);

  const columns = useMemo<MRT_ColumnDef<RouteModel>[]>(
    () => [
      {
        header: "Departure City",
        accessorKey: "departureCity",
        enableSorting: false,
      },
      {
        header: "Arrival City",
        accessorKey: "arrivalCity",
        enableSorting: false,
      },
      {
        header: "Departure Time",
        accessorKey: "departureTime",
        enableSorting: false,
      },
      {
        header: "Arrival Time",
        accessorKey: "arrivalTime",
        enableSorting: false,
      },
      {
        header: "Train Type",
        accessorKey: "trainType",
        enableSorting: false,
      },
      {
        header: "Days of Operation",
        accessorKey: "daysOfOperation",
        enableSorting: false,

        Cell: ({ cell }: any) =>
          getDisplayNameForDaysOfOperation(cell.getValue()),
      },
      {
        header: "First Class Ticket Rate",
        accessorKey: "firstClassTicketRate",
        enableSorting: false,
      },
      {
        header: "Second Class Ticket Rate",
        accessorKey: "secondClassTicketRate",
        enableSorting: false,
      },
      {
        header: "Trip Duration",
        accessorKey: "tripDuration",
        enableSorting: false,
        Cell: ({ cell }: any) => {
          const duration = cell.getValue() as number;
          const hours = Math.floor(duration);
          const minutes = Math.round((duration - hours) * 60);

          if (hours === 0) {
            return `${minutes}m`;
          } else if (minutes === 0) {
            return `${hours}h`;
          } else {
            return `${hours}h ${minutes}m`;
          }
        },
      },
    ],
    []
  );

  // TODO ask prof about disabling sorting and filtering in ui component
  const table = useMaterialReactTable({
    columns,
    data: routes,

    // disable filtering
    enableColumnFilterModes: false,
    enableFilters: false,
    enableGlobalFilter: false,
    enableColumnFilters: false,

    // disable column actions
    enableColumnActions: false,

    // disable searching
    muiSearchTextFieldProps: { disabled: true },
  });

  const displayIndirectTable =
    searchConnectionsQuery.isSuccess &&
    searchConnectionsQuery.data?.containsIndirectConnections === true;

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  return (
    <>
      {/* Sorting Controls */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" component="span">
          Sort Results:
        </Typography>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={handleSortByChange}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="tripDuration">Trip Duration</MenuItem>
            <MenuItem value="firstClassTicketRate">First Class Price</MenuItem>
            <MenuItem value="secondClassTicketRate">
              Second Class Price
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={handleSortOrderChange}
            disabled={!sortBy}
          >
            <MenuItem value="asc">
              {sortBy === "tripDuration"
                ? "Shortest First"
                : sortBy.includes("Price")
                ? "Lowest First"
                : "Ascending"}
            </MenuItem>
            <MenuItem value="desc">
              {sortBy === "tripDuration"
                ? "Longest First"
                : sortBy.includes("Price")
                ? "Highest First"
                : "Descending"}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ maxWidth: "90vw", overflowX: "auto" }}>
        {!displayIndirectTable && <MaterialReactTable table={table} />}
        {displayIndirectTable && <IndirectConnectionTable data={connections} />}
      </Box>
    </>
  );
}
