import { useMemo } from "react";
import type { ConnectionModel } from "../models/models";
import { getDisplayNameForDaysOfOperation } from "../utils/dateUtils";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetAllConnections } from "../queries/searchQueries";

/**
 * Built using https://www.material-react-table.com/docs/getting-started/usage as reference.
 */
export default function ConnectionTable() {
  // TODO fetch from backend instead of hardcoding

  const allConnectionsQuery = useGetAllConnections();

  const data = useMemo<ConnectionModel[]>(() => {
    if (allConnectionsQuery.isSuccess && allConnectionsQuery.data) {
      return allConnectionsQuery.data;
    } else {
      return [];
    }
  }, [allConnectionsQuery]);

  const columns = useMemo<MRT_ColumnDef<ConnectionModel>[]>(
    () => [
      {
        header: "Departure City",
        accessorKey: "departureCity",
      },
      {
        header: "Arrival City",
        accessorKey: "arrivalCity",
      },
      {
        header: "Departure Time",
        accessorKey: "departureTime",
      },
      {
        header: "Arrival Time",
        accessorKey: "arrivalTime",
      },
      {
        header: "Train Type",
        accessorKey: "trainType",
      },
      {
        header: "Days of Operation",
        accessorKey: "daysOfOperation",
        Cell: ({ cell }: any) => getDisplayNameForDaysOfOperation(cell.getValue()),
      },
      {
        header: "First Class Ticket Rate",
        accessorKey: "firstClassTicketRate",
      },
      {
        header: "Second Class Ticket Rate",
        accessorKey: "secondClassTicketRate",
      },
    ],
    []
  );

  // TODO ask prof about disabling sorting and filtering in ui component
  const table = useMaterialReactTable({
    columns,
    data,

    // disable sorting
    enableSorting: false,

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

  return <MaterialReactTable table={table} />;
}
