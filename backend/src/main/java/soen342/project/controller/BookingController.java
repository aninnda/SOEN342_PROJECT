package soen342.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import soen342.project.DTOs.TicketResponse;
import soen342.project.model.Booking;
import soen342.project.service.BookingService;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/bookings")
    public ResponseEntity<Map<String, Object>> createBooking(@RequestBody Booking booking) {
        Map<String, Object> response = bookingService.createBooking(booking);
        Booking savedBooking = (Booking) response.get("booking");
        return ResponseEntity.created(URI.create("/bookings/" + savedBooking.getId())).body(response);
    }

    // Search bookings by trip reference number
    @GetMapping("/bookings/searchByTripReference")
    public ResponseEntity<List<TicketResponse>> searchByTripReference(
            @org.springframework.web.bind.annotation.RequestParam(value = "tripReference") String tripReference) {
        List<TicketResponse> tickets = bookingService.searchByTripReference(tripReference);
        return ResponseEntity.ok(tickets);
    }

    // Search bookings by identifier and last name fragment
    @GetMapping("/bookings/search")
    public ResponseEntity<List<TicketResponse>> searchBookings(
            @org.springframework.web.bind.annotation.RequestParam(value = "identifier") String identifier,
            @org.springframework.web.bind.annotation.RequestParam(value = "name", required = false) String name) {
        List<TicketResponse> tickets = bookingService.searchBookings(identifier, name);
        return ResponseEntity.ok(tickets);
    }

    // Get all bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<TicketResponse>> getAllBookings() {
        List<TicketResponse> tickets = bookingService.getAllBookings();
        return ResponseEntity.ok(tickets);
    }


}
