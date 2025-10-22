package soen342.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import soen342.project.model.Trip;
import soen342.project.service.TripService;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import soen342.project.DTOs.DetailedTrip;
import soen342.project.model.Ticket;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class TripController {

    @Autowired
    private TripService tripService;

    @PostMapping("/trips")
    public ResponseEntity<Map<String, Object>> createTrip(@RequestBody Trip trip) {
        Map<String, Object> response = tripService.createTrip(trip);
        Trip savedTrip = (Trip) response.get("trip");
        return ResponseEntity.created(URI.create("/trips/" + savedTrip.getId())).body(response);
    }

    // Search trips by trip reference number
    @GetMapping("/trips/searchByTripId")
    public ResponseEntity<List<DetailedTrip>> searchByTripId(
            @RequestParam(value = "tripId") String tripId) {
        List<DetailedTrip> trips = tripService.searchByTripId(tripId);
        return ResponseEntity.ok(trips);
    }

    // Search trips by id and last name fragment
    @GetMapping("/trips/searchByTravelerId")
    public ResponseEntity<List<DetailedTrip>> searchTrips(
            @RequestParam(value = "travelerId") String travelerId,
            @RequestParam(value = "name", required = false) String name) {
        List<DetailedTrip> trips = tripService.searchTrips(travelerId, name);
        return ResponseEntity.ok(trips);
    }

    // Get all trips
    @GetMapping("/trips")
    public ResponseEntity<List<DetailedTrip>> getAllTrips() {
        List<DetailedTrip> trips = tripService.getAllTrips();
        return ResponseEntity.ok(trips);
    }

    // search for all tickets by trip id
    @GetMapping("/tickets/search")
    public ResponseEntity<List<Ticket>> searchTicketsByTripId(
            @RequestParam(value = "tripId") String tripId) {
        List<Ticket> tickets = tripService.searchTicketsByTripId(tripId);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/tickets/searchByTravelerId")
    public ResponseEntity<List<Ticket>> searchByTravelerId(
            @RequestParam(value = "travelerId") String travelerId) {
        List<Ticket> tickets = tripService.searchByTravelerId(travelerId);
        return ResponseEntity.ok(tickets);
    }


}
