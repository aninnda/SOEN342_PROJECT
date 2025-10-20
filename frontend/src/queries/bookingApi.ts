import api from "./api";

export type BookingRequest = {
  passengerName: string;
  passengerAge: number;
  passengerIdentifier: string;
  routeIds: string[];
  tripReference?: string;
};

export async function createBooking(booking: BookingRequest) {
  const res = await api.url("/bookings").post(booking).json<any>();
  if (res && res.message === "Booking successful") {
    return res;
  } else {
    throw new Error(res && res.message ? res.message : "Booking failed");
  }
}
