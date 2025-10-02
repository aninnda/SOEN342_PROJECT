import { useMemo } from "react";
import type { Connection } from "../models/models";
import { getDisplayNameForDaysOfOperation } from "../utils/dateUtils";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

/**
 * Built using https://www.material-react-table.com/docs/getting-started/usage as reference.
 */
export default function ConnectionTable() {
  // TODO fetch from backend instead of hardcoding
  const data = useMemo<Connection[]>(
    () => [
      {
        routeId: "R1",
        departureCity: "London",
        arrivalCity: "Paris",
        departureTime: "2024-10-01T08:00:00Z",
        arrivalTime: "2024-10-01T10:30:00Z",
        trainType: "Eurostar",
        daysOfOperation: "Mon,Wed,Fri",
        firstClassTicketRate: 120,
        secondClassTicketRate: 60,
      },
      {
        routeId: "R2",
        departureCity: "Berlin",
        arrivalCity: "Munich",
        departureTime: "2024-10-01T09:00:00Z",
        arrivalTime: "2024-10-01T12:00:00Z",
        trainType: "ICE",
        daysOfOperation: "Mon-Fri",
        firstClassTicketRate: 100,
        secondClassTicketRate: 50,
      },
      {
        routeId: "R3",
        departureCity: "Madrid",
        arrivalCity: "Barcelona",
        departureTime: "2024-10-01T07:30:00Z",
        arrivalTime: "2024-10-01T10:00:00Z",
        trainType: "AVE",
        daysOfOperation: "Daily",
        firstClassTicketRate: 90,
        secondClassTicketRate: 45,
      },
      {
        routeId: "R4",
        departureCity: "Rome",
        arrivalCity: "Venice",
        departureTime: "2024-10-05T06:45:00Z",
        arrivalTime: "2024-10-05T10:15:00Z",
        trainType: "Frecciarossa",
        daysOfOperation: "Sat-Tue",
        firstClassTicketRate: 110,
        secondClassTicketRate: 55,
      },
      {
        routeId: "R5",
        departureCity: "Amsterdam",
        arrivalCity: "Brussels",
        departureTime: "2024-10-07T08:15:00Z",
        arrivalTime: "2024-10-07T09:45:00Z",
        trainType: "Thalys",
        daysOfOperation: "Mon",
        firstClassTicketRate: 95,
        secondClassTicketRate: 48,
      },
    ],
    []
  );

  const columns = useMemo<MRT_ColumnDef<Connection>[]>(
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
        Cell: ({ cell }: any) => new Date(cell.getValue()).toLocaleString(),
      },
      {
        header: "Arrival Time",
        accessorKey: "arrivalTime",
        Cell: ({ cell }: any) => new Date(cell.getValue()).toLocaleString(),
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
