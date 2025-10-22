package soen342.project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soen342.project.DTOs.RouteDetails;
import soen342.project.data.RouteRepository;
import soen342.project.data.TicketRepository;
import soen342.project.data.TravelerRepository;
import soen342.project.data.TripRepository;
import soen342.project.model.Route;
import soen342.project.model.Ticket;
import soen342.project.model.Traveler;
import soen342.project.model.Trip;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private TravelerRepository travelerRepository;

    @Autowired
    private TicketRepository ticketRepository;

    /**
     * Creates a new trip and generates a trip reference id
     */
    @Transactional
    public Map<String, Object> createTrip(Trip trip) {

        createOrUpdateTravelers(trip.getTravelers());
        createTicketsForTrip(trip);

        Trip saved = tripRepository.save(trip);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Trip created successfully");
        response.put("trip", saved);
        response.put("tripReference", saved.getId());
        return response;
    }

    private void createOrUpdateTravelers(List<Traveler> travelers) {
        if (travelers != null) {
            for (var traveler : travelers) {
                var existing = travelerRepository.findByIdIgnoreCase(traveler.getId());
                if (existing != null) {
                    // Update existing traveler
                    existing.setFirstName(traveler.getFirstName());
                    existing.setLastName(traveler.getLastName());
                    existing.setAge(traveler.getAge());
                    travelerRepository.save(existing);
                } else {
                    // Create new traveler
                    travelerRepository.save(traveler);
                }
            }
        }
    }

    private void createTicketsForTrip(Trip trip) {
        for (Traveler traveler : trip.getTravelers()) {

            var ticket = new Ticket(traveler, trip, buildRouteDetails(trip));
            ticketRepository.save(ticket);
        }
    }

    /**
     * Search trips by trip reference number and return enriched ticket
     * responses
     */
    public List<Trip> searchByTripId(String tripId) {
        List<Trip> trips = tripRepository.findById(tripId);
        return trips;
    }

    /**
     * Search trips by identifier and optional name fragment
     */
    public List<Trip> searchTrips(String identifier, String name) {
        List<Trip> trips;
        if (name == null || name.isBlank()) {
            trips = tripRepository.findByTraveler_Identifier(identifier);
        } else {
            trips = tripRepository.findByTraveler_IdentifierAndTraveler_NameContainingIgnoreCase(identifier,
                    name);
        }
        return trips;
    }

    /**
     * Get all trips
     */
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    private List<RouteDetails> buildRouteDetails(Trip trip) {
        List<RouteDetails> routeDetailsList = new ArrayList<>();
        for (String routeId : trip.getRouteIds()) {
            Route route = RouteRepository.getInstance().getRoutes().stream()
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
        return routeDetailsList;
    }


    public List<Ticket> searchTicketsByTripId(String tripId) {
        List<Ticket> tickets = ticketRepository.findByTripId(Long.parseLong(tripId));
        return tickets;
    }

    public List<Ticket> searchByTravelerId(Long travelerId) {
        List<Ticket> tickets = ticketRepository.findByTravelerId(travelerId);
        return tickets;
    }

    /**
     * Helper method to build ticket responses from trips
     */
    // private List<TicketResponse> buildTicketResponses(List<Trip> trips) {
    //     List<TicketResponse> tickets = new ArrayList<>();
    //     for (Trip trip : trips) {
    //         List<RouteDetails> routeDetailsList = new ArrayList<>();
    //         for (String routeId : trip.getRouteIds()) {
    //             Route route = RouteRepository.getInstance().getRoutes().stream()
    //                     .filter(r -> r.getRouteId().equals(routeId))
    //                     .findFirst().orElse(null);
    //             if (route != null) {
    //                 routeDetailsList.add(new RouteDetails(
    //                         route.getRouteId(),
    //                         route.getDepartureCity(),
    //                         route.getArrivalCity(),
    //                         route.getDepartureTime(),
    //                         route.getArrivalTime(),
    //                         route.getTripDuration()));
    //             }
    //         }
    //         tickets.add(new TicketResponse(
    //                 trip.getId(),
    //                 trip.getTravelers().getFullName(),
    //                 trip.getTraveler().getId(),
    //                 trip.getTripReference(),
    //                 routeDetailsList));
    //     }
    //     return tickets;
    // }
}
