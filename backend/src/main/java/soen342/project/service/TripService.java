package soen342.project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soen342.project.DTOs.DetailedTrip;
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
    public Map<String, Object> createTrip(Trip tripRequest) {
        Trip trip = new Trip(tripRequest.getTravelers(), tripRequest.getRouteIds(), tripRequest.getInitialDepartureDate());

        createOrUpdateTravelers(trip.getTravelers());

        Trip saved = tripRepository.save(trip);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Trip created successfully");
        response.put("trip", saved);

        createTicketsForTrip(saved);

        return response;
    }

    private void createOrUpdateTravelers(List<Traveler> travelers) {
        if (travelers != null) {
            for (int i = 0; i < travelers.size(); i++) {
                Traveler traveler = travelers.get(i);
                var existing = travelerRepository.findByIdIgnoreCase(traveler.getId());
                if (existing != null) {
                    // Update existing traveler
                    existing.setFirstName(traveler.getFirstName());
                    existing.setLastName(traveler.getLastName());
                    existing.setAge(traveler.getAge());
                    travelers.set(i, travelerRepository.save(existing));
                } else {
                    // Create new traveler
                    travelers.set(i, travelerRepository.save(traveler));
                }
            }
        }
    }

    private void createTicketsForTrip(Trip trip) {
        for (Traveler traveler : trip.getTravelers()) {

            var ticket = new Ticket(traveler, trip);
            ticketRepository.save(ticket);
        }
    }

    /**
     * Search trips by trip reference number and return enriched ticket
     * responses
     */
    public List<DetailedTrip> searchByTripId(String tripId) {
        List<Trip> trips = tripRepository.findById(Long.parseLong(tripId))
                .map(trip -> new ArrayList<>(List.of(trip)))
                .orElse(new ArrayList<>());
        return constructDetailedTrips(trips);
    }

    /**
     * Search trips by traveler id and optional name fragment
     */
    public List<DetailedTrip> searchTrips(String travelerId, String name) {
        List<Trip> trips;
        trips = tripRepository.findByTravelers_Id(travelerId).stream()
                .filter(trip -> {
                    if (name == null || name.isEmpty()) {
                        return true;
                    }
                    return trip.getTravelers().stream()
                            .anyMatch(traveler -> traveler.getLastName().equalsIgnoreCase(name));
                })
                .collect(Collectors.toList());
        return constructDetailedTrips(trips);
    }

    /**
     * Get all trips
     */
    public List<DetailedTrip> getAllTrips() {
        return constructDetailedTrips(tripRepository.findAll());
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
        List<Ticket> tickets = ticketRepository.findByTrip_Id(Long.parseLong(tripId));
        return tickets;
    }

    public List<Ticket> searchByTravelerId(String travelerId) {
        List<Ticket> tickets = ticketRepository.findByTraveler_Id(travelerId);
        return tickets;
    }

    private List<DetailedTrip> constructDetailedTrips(List<Trip> trips) {
        return trips.stream()
                .map(trip -> new DetailedTrip(trip, buildRouteDetails(trip)))
                .collect(Collectors.toList());
    }

}
