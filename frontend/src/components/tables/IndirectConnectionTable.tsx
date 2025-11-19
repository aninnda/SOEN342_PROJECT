import InfoIcon from "@mui/icons-material/Info";
import { Alert, Box, Button, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { useMemo, useState } from "react";
import type {
  ConnectionModel,
  LayoverModel,
  RouteModel,
} from "../../models/models";
import {
  formatDuration,
  getDisplayNameForDaysOfOperation,
  toIndex,
} from "../../utils/dateUtils";
import BookingModal from "../BookingModal";

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
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>([]);

  function getConnectionId(connection: ConnectionModel): string {
    return (
      connection.routes.map((route) => route.routeId).join("-") +
      ":" +
      (connection.layovers
        ? connection.layovers
            .map((layover) => `${toIndex(layover.startDepDay)}`)
            .join("-") +
          "-" +
          toIndex(connection.layovers[connection.layovers.length - 1].endArrDay)
        : "")
    );
  }

  const extendedRoutes = useMemo<ExtendedRouteModel[]>(() => {
    const routes: ExtendedRouteModel[] = [];

    props.data.forEach((connection) => {
      const connectionId = getConnectionId(connection);
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
        header: "",
        accessorKey: "routeId",
        enableSorting: false,
        enableGrouping: false,
        AggregatedCell: ({ row }: any) => {
          const route = row.original as ExtendedRouteModel;
          // Find the full connection for this route
          const connection = props.data.find(
            (conn) => route.connectionId === getConnectionId(conn)
          );
          const routeIds = connection
            ? connection.routes.map((r) => r.routeId)
            : [route.routeId];
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedRouteIds(routeIds);
                setIsBookingDialogOpen(true);
              }}
            >
              Book
            </Button>
          );
        },
        Cell: () => {
          return null; // only display book button in aggregated cell
        },
        size: 105,
      },
      {
        header: "Connection",
        accessorKey: "connectionId",
        enableSorting: false,
        enableGrouping: true,
        GroupedCell: ({ row }) => {
          const connectionId = row.original.connectionId;

          const routes =
            props.data.find((conn) => connectionId === getConnectionId(conn))
              ?.routes ?? [];

          const cities = new Set<string>(routes.map((r) => r.departureCity));

          if (routes.length > 1) {
            cities.add(routes[routes.length - 1].arrivalCity);
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
        Cell: ({ cell }) => {
          return "";
        },
        enableSorting: true,
        enableGrouping: false,
        Header: () => (
          <Box display="flex" alignItems="center">
            Connection Change Duration
            <Tooltip
              title={
                <Box display="flex" flexDirection="column" gap={1}>
                  <Box>
                    Displayed indirect connections will contain layovers that:
                  </Box>
                  <Box>
                    are no longer than 1 hour long, if the layover starts between 7
                    pm to 5 am (exclusive).
                  </Box>
                  <Box>
                    are no longer than 3 hours long, if the layover starts between 5
                    am to 7 pm (inclusive).
                  </Box>
                </Box>
              }
            >
              <InfoIcon color="warning" />
            </Tooltip>
          </Box>
        ),
        AggregatedCell: ({ row }: { row: MRT_Row<ExtendedRouteModel> }) => {
          const tooltipText = row.original.layovers?.map(
            (layover: LayoverModel, index: number) => {
              return `Layover ${index + 1}: Depart ${
                layover.startRoute.departureCity
              } (at ${layover.startRoute.departureTime}, ${
                layover.startDepDay
              }), then arrive at ${layover.startRoute.arrivalCity} (${
                layover.startRoute.arrivalTime
              }, ${layover.startArrDay}), then wait ${formatDuration(
                layover.duration
              )} for the next train to ${layover.endRoute.arrivalCity} (${
                layover.endRoute.departureTime
              }, ${layover.endDepDay})`;
            }
          );

          return (
            <Box gap={1} display="flex">
              {formatDuration(row.original.connectionChangeDuration as number)}

              <Tooltip
                title={
                  <Box display="flex" flexDirection="column" gap={1}>
                    {tooltipText?.map((text) => {
                      return <Box>{text}</Box>;
                    })}
                  </Box>
                }
              >
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
    initialState: { grouping: ["connectionId"], expanded: true } as any,
    paginateExpandedRows: false,

    // styling
    displayColumnDefOptions: {
      "mrt-row-expand": {
        muiTableBodyCellProps: ({
          row,
        }: {
          row: MRT_Row<ExtendedRouteModel>;
        }) => ({
          sx: (theme: any) => ({
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
        <Alert severity="info" variant="outlined" sx={{ my: 2 }}>
          No direct connections were found. Displaying indirect connections
          instead.
        </Alert>
      </Box>
      <MaterialReactTable table={table as any} />
      <BookingModal
        open={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        routeIds={selectedRouteIds}
      />
    </>
  );
}
