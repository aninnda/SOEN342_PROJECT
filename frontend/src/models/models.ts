import type { Dayjs } from "dayjs";

const DayOfWeek = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
} as const;

export type DayOfWeek = typeof DayOfWeek[keyof typeof DayOfWeek];


export type RouteModel = {
  routeId: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string; // format is hh:mm
  arrivalTime: string; // format is hh:mm
  trainType: string;
  daysOfOperation: DayOfWeek[];
  firstClassTicketRate: number; // in euro
  secondClassTicketRate: number; // in euro
  tripDuration?: number; // format is hh:mm
}

export type ConnectionModel = {
  routes: RouteModel[];
  totalMovingDuration: number;
  connectionChangeDuration: number;
  totalTripDuration: number;
  totalFirstClassTicketRate: number;
  totalSecondClassTicketRate: number;
  numberOfTransfers: number;
  layovers?: LayoverModel[];
};


export type LayoverModel = {
  startRoute: RouteModel;
  endRoute: RouteModel;
  firstRouteStartDay: DayOfWeek;
  firstRouteEndDay: DayOfWeek;
  secondRouteStartDay: DayOfWeek;
  layoverDuration: number; // in hours
}


export type SearchFilters = {
  departureCity?: string;
  arrivalCity?: string;
  departureTime?: Dayjs | null;
  arrivalTime?: Dayjs | null;
  trainType?: string;
  maxFirstClassPrice?: number;
  maxSecondClassPrice?: number;
  dayOfWeek?: DayOfWeek | null;
}


export type TravelerModel = {




}