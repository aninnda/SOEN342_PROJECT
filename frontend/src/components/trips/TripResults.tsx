import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState } from "react";
import type { DetailedTripModel } from "../../models/models";
import { formatDuration } from "../../utils/dateUtils";
import SingleTripResult from "./SingleTripResult";

type Props = {
  travelerId?: string;
  results: DetailedTripModel[] | undefined;
  isLoading?: boolean;
};

export function TripResults(props: Props) {
  const pastResults = props.results?.filter((trip) => {
    const departureDate = dayjs(trip.initialDepartureDate);
    return departureDate.isBefore(dayjs().startOf("day"), "day");
  });
  const futureResults = props.results?.filter((trip) => {
    const departureDate = dayjs(trip.initialDepartureDate);
    return (
      departureDate.isAfter(dayjs().startOf("day")) ||
      departureDate.isSame(dayjs(), "day")
    );
  }).sort((a, b) => {
    const dateA = dayjs(a.initialDepartureDate);
    const dateB = dayjs(b.initialDepartureDate);
    return dateA.diff(dateB);
  });

  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <Box sx={{ p: 1, minHeight: 260 }}>
      {props.isLoading ? (
        <CircularProgress sx={{ display: "flex", justifySelf: "center" }} />
      ) : (
        !props.results?.length && <Typography>No trips found.</Typography>
      )}

      {!!props.results?.length && (
        <Box>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
          >
            {!!futureResults?.length && <Tab label="Upcoming" />}
            {!!pastResults?.length && <Tab label="Past" />}
          </Tabs>
          <div role="tabpanel" hidden={selectedTab !== 0} id={"tabpanel-0"}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Upcoming Trips
            </Typography>
            <List>
              {futureResults?.map((item) => (
                <SingleTripResult key={item.id} trip={item} />
              ))}
            </List>
          </div>

          <div role="tabpanel" hidden={selectedTab !== 1} id={"tabpanel-1"}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Past Trips
            </Typography>
            <List>
              {pastResults?.map((item) => (
                <SingleTripResult key={item.id} trip={item} />
              ))}
            </List>
          </div>
        </Box>
      )}
    </Box>
  );
}
