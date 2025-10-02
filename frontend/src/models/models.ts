export type ConnectionModel = {
  routeId: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string; // format is hh:mm
  arrivalTime: string; // format is hh:mm
  trainType: string;
  daysOfOperation: string;
  firstClassTicketRate: number; // in euro
  secondClassTicketRate: number; // in euro
  tripDuration?: string; // format is hh:mm
};