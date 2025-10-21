package soen342.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soen342.project.DTOs.RouteDetails;
import soen342.project.DTOs.TicketResponse;
import soen342.project.data.BookingRepository;
import soen342.project.model.Booking;
import soen342.project.model.Route;
import soen342.project.data.Database;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    /**
     * Creates a new booking and generates a trip reference if not provided
     */
    @Transactional
    public Map<String, Object> createBooking(Booking booking) {
        // If no tripReference is provided, generate a new one (for single bookings)
        if (booking.getTripReference() == null || booking.getTripReference().isEmpty()) {
            booking.setTripReference(UUID.randomUUID().toString());
        }
        Booking saved = bookingRepository.save(booking);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Booking successful");
        response.put("booking", saved);
        response.put("tripReference", saved.getTripReference());
        return response;
    }

    /**
     * Search bookings by trip reference number and return enriched ticket responses
     */
    public List<TicketResponse> searchByTripReference(String tripReference) {
        List<Booking> bookings = bookingRepository.findByTripReference(tripReference);
        return buildTicketResponses(bookings);
    }

    /**
     * Search bookings by identifier and optional name fragment
     */
    public List<TicketResponse> searchBookings(String identifier, String name) {
        List<Booking> bookings;
        if (name == null || name.isBlank()) {
            bookings = bookingRepository.findByPassengerIdentifier(identifier);
        } else {
            bookings = bookingRepository.findByPassengerIdentifierAndPassengerNameContainingIgnoreCase(identifier,
                    name);
        }
        return buildTicketResponses(bookings);
    }

    /**
     * Get all bookings
     */
    public List<TicketResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return buildTicketResponses(bookings);
    }

    /**
     * Helper method to build enriched ticket responses from bookings
     */
    private List<TicketResponse> buildTicketResponses(List<Booking> bookings) {
        List<TicketResponse> tickets = new ArrayList<>();
        for (Booking booking : bookings) {
            List<RouteDetails> routeDetailsList = new ArrayList<>();
            for (String routeId : booking.getRouteIds()) {
                Route route = Database.getInstance().getRoutes().stream()
                        .filter(r -> r.getRouteId().equals(routeId))
                        .findFirst().orElse(null);
                if (route != null) {
                    routeDetailsList.add(new RouteDetails(
                            route.getRouteId(),
                            route.getDepartureCity(),
                            route.getArrivalCity(),
                            route.getDepartureTime(),
                            route.getArrivalTime(),
                            route.getTripDuration()));
                }
            }
            tickets.add(new TicketResponse(
                    booking.getId(),
                    booking.getPassengerName(),
                    booking.getPassengerIdentifier(),
                    booking.getTripReference(),
                    routeDetailsList));
        }
        return tickets;
    }

}
