package soen342.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soen342.project.DTOs.RouteDetails;
import soen342.project.DTOs.TicketResponse;
import soen342.project.data.TripRepository;
import soen342.project.model.Trip;
import soen342.project.model.Route;
import soen342.project.data.RouteRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    /**
     * Creates a new trip and generates a trip reference id
     */
    @Transactional
    public Map<String, Object> createTrip(Trip trip) {
        // If no tripReference is provided, generate a new one (for single trips)
        if (trip.getTripReference() == null || trip.getTripReference().isEmpty()) {
            trip.setTripReference(UUID.randomUUID().toString());
        }
        Trip saved = tripRepository.save(trip);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Trip created successfully");
        response.put("trip", saved);
        response.put("tripReference", saved.getTripReference());
        return response;
    }

    /**
     * Search trips by trip reference number and return enriched ticket responses
     */
    public List<TicketResponse> searchByTripReference(String tripReference) {
        List<Trip> trips = tripRepository.findByTripReference(tripReference);
        return buildTicketResponses(trips);
    }

    /**
     * Search trips by identifier and optional name fragment
     */
    public List<TicketResponse> searchTrips(String identifier, String name) {
        List<Trip> trips;
        if (name == null || name.isBlank()) {
            trips = tripRepository.findBytravelerIdentifier(identifier);
        } else {
            trips = tripRepository.findBytravelerIdentifierAndTravelerNameContainingIgnoreCase(identifier,
                    name);
        }
        return buildTicketResponses(trips);
    }

    /**
     * Get all trips
     */
    public List<TicketResponse> getAllTrips() {
        List<Trip> trips = tripRepository.findAll();
        return buildTicketResponses(trips);
    }

    /**
     * Helper method to build ticket responses from trips
     */
    private List<TicketResponse> buildTicketResponses(List<Trip> trips) {
        List<TicketResponse> tickets = new ArrayList<>();
        for (Trip trip : trips) {
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
            tickets.add(new TicketResponse(
                    trip.getId(),
                    trip.gettravelerName(),
                    trip.gettravelerIdentifier(),
                    trip.getTripReference(),
                    routeDetailsList));
        }
        return tickets;
    }

}
