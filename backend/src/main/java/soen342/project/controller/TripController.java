package soen342.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import soen342.project.DTOs.TicketResponse;
import soen342.project.model.Trip;
import soen342.project.service.TripService;
import java.net.URI;
import java.util.List;
import java.util.Map;

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
    @GetMapping("/trips/searchByTripReference")
    public ResponseEntity<List<TicketResponse>> searchByTripReference(
            @org.springframework.web.bind.annotation.RequestParam(value = "tripReference") String tripReference) {
        List<TicketResponse> tickets = tripService.searchByTripReference(tripReference);
        return ResponseEntity.ok(tickets);
    }

    // Search trips by identifier and last name fragment
    @GetMapping("/trips/search")
    public ResponseEntity<List<TicketResponse>> searchTrips(
            @org.springframework.web.bind.annotation.RequestParam(value = "identifier") String identifier,
            @org.springframework.web.bind.annotation.RequestParam(value = "name", required = false) String name) {
        List<TicketResponse> tickets = tripService.searchTrips(identifier, name);
        return ResponseEntity.ok(tickets);
    }

    // Get all trips
    @GetMapping("/trips")
    public ResponseEntity<List<TicketResponse>> getAllTrips() {
        List<TicketResponse> tickets = tripService.getAllTrips();
        return ResponseEntity.ok(tickets);
    }


}
