import { Box, Button } from "@mui/material";
import BookingModal from "../BookingModal";
import { useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
// ...existing code...
import type {
  ConnectionModel,
  RouteModel,
  SearchFilters,
} from "../../models/models";
import { useSearchConnections } from "../../queries/searchQueries";
import { getDisplayNameForDaysOfOperation } from "../../utils/dateUtils";
import IndirectConnectionTable from "./IndirectConnectionTable";

interface ConnectionTableProps {
  searchFilters?: SearchFilters;
}

/**
 * Built using https://www.material-react-table.com/docs/getting-started/usage as reference.
 */
export default function ConnectionTable({
  searchFilters = {},
}: ConnectionTableProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const searchConnectionsQuery = useSearchConnections(searchFilters, true);

  const connections = useMemo<ConnectionModel[]>(() => {
    if (searchConnectionsQuery.isSuccess && searchConnectionsQuery.data) {
      return searchConnectionsQuery.data.connections;
    } else {
      return [];
    }
  }, [searchConnectionsQuery]);

  const routes = useMemo<RouteModel[]>(() => {
    const routeList = connections.map((conn) => conn.routes[0]);

    return routeList;
  }, [connections]);

  const columns = useMemo<MRT_ColumnDef<RouteModel>[]>(
    () => [
      {
        header: "",
        accessorKey: "routeId",
        enableSorting: false,
        Cell: ({ row }: any) => {
          const route = row.original as RouteModel;
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBook(route)}
            >
              Book
            </Button>
          );
        },
        size: 105,
      },
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
        enableSorting: true,
      },
      {
        header: "Second Class Ticket Rate",
        accessorKey: "secondClassTicketRate",
        enableSorting: true,
      },
      {
        header: "Trip Duration",
        accessorKey: "tripDuration",
        enableSorting: true,
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

  function handleBook(route: RouteModel) {
    setSelectedRouteId(route.routeId);
    setBookingOpen(true);
  }

  const table = useMaterialReactTable({
    columns,
    data: routes,

    enableStickyHeader: true,

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

  return (
    <>
      <Box sx={{ maxWidth: "90vw", overflowX: "auto" }}>
        {!displayIndirectTable && <MaterialReactTable table={table as any} />}
        {displayIndirectTable && <IndirectConnectionTable data={connections} />}
      </Box>
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        routeIds={selectedRouteId ? [selectedRouteId] : []}
      />
    </>
  );
}
