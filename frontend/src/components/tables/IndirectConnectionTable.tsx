import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import type { ConnectionModel, RouteModel } from "../../models/models";
import { getDisplayNameForDaysOfOperation } from "../../utils/dateUtils";
import { useMemo } from "react";

type IndirectConnectionTableProps = {
  data: ConnectionModel[];
};

type ExtendedRouteModel = RouteModel & { connectionId: string };

//TODO map indirect connections
export default function IndirectConnectionTable(
  props: IndirectConnectionTableProps
) {
  const extendedRoutes = useMemo<ExtendedRouteModel[]>(() => {
    const routes: ExtendedRouteModel[] = [];

    props.data.forEach((connection) => {
      const connectionId = connection.routes
        .map((route) => route.routeId)
        .join("-");
      connection.routes.forEach((route) => {
        routes.push({ ...route, connectionId });
      });
    });

    return routes;
  }, [props.data]);

  const columns = useMemo<MRT_ColumnDef<ExtendedRouteModel>[]>(
    () => [
      {
        header: "Connection",
        accessorKey: "connectionId",
        enableSorting: false,
        enableGrouping: true,
        Cell: ({ row, table }) => {
          // Get all rows in the same group (same connectionId)
          const connectionId = row.original.connectionId;
          const groupedRows = table
            .getRowModel()
            .rows.filter((r) => r.original.connectionId === connectionId);
          const cities = new Set<string>(
            groupedRows.map((r) => r.original.departureCity)
          );

          if (groupedRows.length > 1) {
            cities.add(
              groupedRows[groupedRows.length - 1].original.arrivalCity
            );
          }
          return Array.from(cities).join(" → ");
        },
      },
      {
        header: "Departure City",
        accessorKey: "departureCity",
        enableSorting: false,
        enableGrouping: false,
      },
      {
        header: "Arrival City",
        accessorKey: "arrivalCity",
        enableSorting: false,
        enableGrouping: false,
      },
      {
        header: "Departure Time",
        accessorKey: "departureTime",
        enableSorting: false,
        enableGrouping: false,
      },
      {
        header: "Arrival Time",
        accessorKey: "arrivalTime",
        enableSorting: false,
        enableGrouping: false,
      },
      {
        header: "Train Type",
        accessorKey: "trainType",
        enableSorting: false,
        enableGrouping: false,
      },
      {
        header: "Days of Operation",
        accessorKey: "daysOfOperation",
        enableSorting: false,
        enableGrouping: false,
        Cell: ({ cell }: any) =>
          getDisplayNameForDaysOfOperation(cell.getValue()),
      },
      {
        header: "First Class Ticket Rate",
        accessorKey: "firstClassTicketRate",
        enableSorting: false,
        enableGrouping: false,
      },
      {
        header: "Second Class Ticket Rate",
        accessorKey: "secondClassTicketRate",
        enableSorting: false,
        enableGrouping: false,
      },
      {
        header: "Trip Duration",
        accessorKey: "tripDuration",
        enableSorting: false,
        enableGrouping: false,
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

  const table = useMaterialReactTable({
    columns,
    data: extendedRoutes,

    // disable filtering
    enableColumnFilterModes: false,
    enableFilters: false,
    enableGlobalFilter: false,
    enableColumnFilters: false,

    // disable column actions
    enableColumnActions: false,

    // disable searching
    muiSearchTextFieldProps: { disabled: true },

    // grouping for connections
    enableGrouping: true,
    groupedColumnMode: false,
    initialState: { grouping: ["connectionId"] },

    // styling
    displayColumnDefOptions: {
      "mrt-row-expand": {},
    },

  });

  return <MaterialReactTable table={table} />;
}
