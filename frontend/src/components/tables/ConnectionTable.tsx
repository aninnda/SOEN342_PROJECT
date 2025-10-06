import { useMemo } from "react";
import type { ConnectionModel, RouteModel } from "../../models/models";
import { getDisplayNameForDaysOfOperation } from "../../utils/dateUtils";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetAllConnections } from "../../queries/searchQueries";
import IndirectConnectionTable from "./IndirectConnectionTable";

/**
 * Built using https://www.material-react-table.com/docs/getting-started/usage as reference.
 */
export default function ConnectionTable() {
  // TODO fetch from backend instead of hardcoding

  const allConnectionsQuery = useGetAllConnections();

  const connections = useMemo<ConnectionModel[]>(() => {
    if (allConnectionsQuery.isSuccess && allConnectionsQuery.data) {
      return allConnectionsQuery.data.connections;
    } else {
      return [];
    }
  }, [allConnectionsQuery]);

  const routes = useMemo<RouteModel[]>(() => {
    return connections.map((conn) => conn.routes[0]);
  }, [connections]);

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
        enableSorting: true,
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
    allConnectionsQuery.isSuccess &&
    allConnectionsQuery.data?.containsIndirectConnections === true;

  return (
    <>
      {!displayIndirectTable && <MaterialReactTable table={table} />}
      {displayIndirectTable && <IndirectConnectionTable data={connections} />}
    </>
  );
}
