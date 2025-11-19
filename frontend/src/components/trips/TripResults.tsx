import {
  Box,
  CircularProgress,
  List,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import type { DetailedTripModel } from "../../models/models";
import SingleTripResult from "./SingleTripResult";

type Props = {
  travelerId?: string;
  results: DetailedTripModel[] | undefined;
  isLoading?: boolean;
};

export function TripResults(props: Props) {
  const pastResults = props.results
    ?.filter((trip) => {
      const departureDate = dayjs(trip.initialDepartureDate);
      return departureDate.isBefore(dayjs().startOf("day"), "day");
    })
    .sort((a, b) => { // most recent first
      const dateA = dayjs(a.initialDepartureDate);
      const dateB = dayjs(b.initialDepartureDate);
      return dateB.diff(dateA);
    });
  const futureResults = props.results
    ?.filter((trip) => {
      const departureDate = dayjs(trip.initialDepartureDate);
      return (
        departureDate.isAfter(dayjs().startOf("day")) ||
        departureDate.isSame(dayjs(), "day")
      );
    })
    .sort((a, b) => { // soonest first  
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
            <Tab label="Upcoming" />
            <Tab label="Past" />
          </Tabs>
          <div role="tabpanel" hidden={selectedTab !== 0} id={"tabpanel-0"}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Upcoming Trips
            </Typography>
            {futureResults?.length === 0 && (
              <Typography sx={{ mt: 3 }}>No upcoming trips found.</Typography>
            )}
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
            {pastResults?.length === 0 && (
              <Typography sx={{ mt: 3 }}>No past trips found.</Typography>
            )}
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
