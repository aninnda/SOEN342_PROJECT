import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import type {
  ConnectionModel,
  LayoverModel,
  RouteModel,
} from "../../models/models";
import {
  formatDuration,
  getDisplayNameForDaysOfOperation,
} from "../../utils/dateUtils";
import { useMemo } from "react";
import { Alert, Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

type IndirectConnectionTableProps = {
  data: ConnectionModel[];
};

type ExtendedRouteModel = RouteModel & {
  connectionId: string;
  connectionChangeDuration: number;
  layovers?: LayoverModel[];
};

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
        routes.push({
          ...route,
          connectionId,
          connectionChangeDuration: connection.connectionChangeDuration,
          layovers: connection.layovers,
        });
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
        GroupedCell: ({ row }) => {
          const connectionId = row.original.connectionId;

          const routes = props.data.find(
            (conn) =>
              connectionId ===
              conn.routes.map((route) => route.routeId).join("-")
          )?.routes;

          const cities = new Set<string>(routes?.map((r) => r.departureCity));

          if (!!routes?.length) {
            if (routes?.length > 1) {
              cities.add(routes[routes?.length - 1].arrivalCity);
            }
          }

          return Array.from(cities).join(" - ");
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
        aggregationFn: "sum",
        AggregatedCell: ({ cell }) => cell.getValue<number>(),
        enableSorting: true,
        enableGrouping: false,
      },
      {
        header: "Second Class Ticket Rate",
        accessorKey: "secondClassTicketRate",
        aggregationFn: "sum",
        AggregatedCell: ({ cell }) => cell.getValue<number>(),
        enableSorting: true,
        enableGrouping: false,
      },
      {
        header: "Trip (moving) Duration",
        accessorKey: "tripDuration",
        aggregationFn: "sum",
        AggregatedCell: ({ cell }) => formatDuration(cell.getValue() as number),
        enableGrouping: false,
        Cell: ({ cell }: any) => {
          const duration = cell.getValue() as number;
          return formatDuration(duration);
        },
      },
      {
        header: "Connection Change Duration",
        accessorKey: "connectionChangeDuration",
        aggregationFn: "max",
        AggregatedCell: ({ cell }) => formatDuration(cell.getValue() as number),
        enableSorting: true,
        enableGrouping: false,
        Header: () => (
          <Box display="flex" alignItems="center">
            Connection Change Duration
            <Tooltip
              title=" Connection change duration is calculated as the shortest time spent waiting at each layover, with ideal departure days.
              Day and time filters do not affect these values."
            >
              <InfoIcon color="warning" />
            </Tooltip>
          </Box>
        ),
        Cell: ({ row }: { row: MRT_Row<ExtendedRouteModel> }) => {
          const tooltipText = row.original.layovers
            ?.map((layover, index) => {
              return `Layover ${index + 1}: Depart ${
                layover.startRoute.departureCity
              } (${layover.startRoute.departureTime}, ${
                layover.firstRouteStartDay
              }), Arrive ${layover.startRoute.arrivalCity} (${
                layover.startRoute.arrivalTime
              }, ${layover.firstRouteEndDay}), then wait ${formatDuration(
                layover.layoverDuration
              )} for the next train to ${layover.endRoute.arrivalCity} (${
                layover.endRoute.departureTime
              }, ${layover.secondRouteStartDay})`;
            })
            .join("\n");

          return (
            <Box gap={1} display="flex">
              {formatDuration(row.original.connectionChangeDuration as number)}

              <Tooltip title={tooltipText}>
                <InfoIcon />
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: extendedRoutes,
    enableStickyHeader: true,

    muiToolbarAlertBannerProps: {
      hidden: true,
    },
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
    initialState: { grouping: ["connectionId"], expanded: true },
    paginateExpandedRows: false,

    // styling
    displayColumnDefOptions: {
      "mrt-row-expand": {
        muiTableBodyCellProps: ({ row }) => ({
          sx: (theme) => ({
            backgroundColor: row.getIsGrouped()
              ? theme.palette.primary.dark
              : "",
          }),
        }),
        size: 10,
      },
    },
  });

  return (
    <>
      <Box>
        <Alert severity="info" variant="outlined" sx={{my: 2}}>
          No direct connections were found. Displaying indirect connections
          instead.
        </Alert>
      </Box>
      <MaterialReactTable table={table} />;
    </>
  );
}
