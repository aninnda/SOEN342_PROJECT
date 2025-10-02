export type Connection = {
  routeId: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string; // iso or utc
  arrivalTime: string; // iso or utc
  trainType: string;
  daysOfOperation: string;
  firstClassTicketRate: number; // in euro
  secondClassTicketRate: number; // in euro
};