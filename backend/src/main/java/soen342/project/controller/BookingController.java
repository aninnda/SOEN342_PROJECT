package soen342.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import soen342.project.data.BookingRepository;
import soen342.project.model.Booking;

import java.net.URI;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/bookings")
    public ResponseEntity<java.util.Map<String, Object>> createBooking(@RequestBody Booking booking) {
        // If no tripReference is provided, generate a new one (for single bookings)
        if (booking.getTripReference() == null || booking.getTripReference().isEmpty()) {
            booking.setTripReference(java.util.UUID.randomUUID().toString());
        }
        Booking saved = bookingRepository.save(booking);
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Booking successful");
        response.put("booking", saved);
        response.put("tripReference", saved.getTripReference());
        return ResponseEntity.created(URI.create("/bookings/" + saved.getId())).body(response);
    }
    // Search bookings by trip reference number
    @GetMapping("/bookings/searchByTripReference")
    public ResponseEntity<java.util.List<TicketResponse>> searchByTripReference(
            @org.springframework.web.bind.annotation.RequestParam(value = "tripReference") String tripReference) {
        java.util.List<Booking> bookings = bookingRepository.findByTripReference(tripReference);
        java.util.List<TicketResponse> tickets = new java.util.ArrayList<>();
        for (Booking booking : bookings) {
            java.util.List<RouteDetails> routeDetailsList = new java.util.ArrayList<>();
            for (String routeId : booking.getRouteIds()) {
                soen342.project.model.Route route = soen342.project.data.Database.getInstance().getRoutes().stream()
                    .filter(r -> r.getRouteId().equals(routeId))
                    .findFirst().orElse(null);
                if (route != null) {
                    routeDetailsList.add(new RouteDetails(
                        route.getRouteId(),
                        route.getDepartureCity(),
                        route.getArrivalCity(),
                        route.getDepartureTime(),
                        route.getArrivalTime(),
                        route.getTripDuration()
                    ));
                }
            }
            tickets.add(new TicketResponse(
                booking.getId(),
                booking.getPassengerName(),
                booking.getPassengerIdentifier(),
                booking.getTripReference(),
                routeDetailsList
            ));
        }
        return ResponseEntity.ok(tickets);
    }

    // Search bookings by identifier and last name fragment
    @GetMapping("/bookings/search")
    public ResponseEntity<java.util.List<TicketResponse>> searchBookings(
            @org.springframework.web.bind.annotation.RequestParam(value = "identifier") String identifier,
            @org.springframework.web.bind.annotation.RequestParam(value = "name", required = false) String name) {

        java.util.List<Booking> bookings;
        if (name == null || name.isBlank()) {
            bookings = bookingRepository.findByPassengerIdentifier(identifier);
        } else {
            bookings = bookingRepository.findByPassengerIdentifierAndPassengerNameContainingIgnoreCase(identifier, name);
        }

        // Build enriched ticket responses
        java.util.List<TicketResponse> tickets = new java.util.ArrayList<>();
        for (Booking booking : bookings) {
            java.util.List<RouteDetails> routeDetailsList = new java.util.ArrayList<>();
            for (String routeId : booking.getRouteIds()) {
                soen342.project.model.Route route = soen342.project.data.Database.getInstance().getRoutes().stream()
                    .filter(r -> r.getRouteId().equals(routeId))
                    .findFirst().orElse(null);
                if (route != null) {
                    routeDetailsList.add(new RouteDetails(
                        route.getRouteId(),
                        route.getDepartureCity(),
                        route.getArrivalCity(),
                        route.getDepartureTime(),
                        route.getArrivalTime(),
                        route.getTripDuration()
                    ));
                }
            }
            tickets.add(new TicketResponse(
                booking.getId(),
                booking.getPassengerName(),
                booking.getPassengerIdentifier(),
                booking.getTripReference(),
                routeDetailsList
            ));
        }
        return ResponseEntity.ok(tickets);
    }

    // DTO for ticket response
    public static class TicketResponse {
        public Long ticketId;
        public String passengerName;
        public String passengerIdentifier;
        public String tripReference;
        public java.util.List<RouteDetails> routes;

        public TicketResponse(Long ticketId, String passengerName, String passengerIdentifier, String tripReference, java.util.List<RouteDetails> routes) {
            this.ticketId = ticketId;
            this.passengerName = passengerName;
            this.passengerIdentifier = passengerIdentifier;
            this.tripReference = tripReference;
            this.routes = routes;
        }
    }

    public static class RouteDetails {
        public String routeId;
        public String departureCity;
        public String arrivalCity;
        public String departureTime;
        public String arrivalTime;
        public double tripDuration;

        public RouteDetails(String routeId, String departureCity, String arrivalCity, String departureTime, String arrivalTime, double tripDuration) {
            this.routeId = routeId;
            this.departureCity = departureCity;
            this.arrivalCity = arrivalCity;
            this.departureTime = departureTime;
            this.arrivalTime = arrivalTime;
            this.tripDuration = tripDuration;
        }
    }

        // note: single GET mapping above handles both identifier-only and identifier+name cases
}
