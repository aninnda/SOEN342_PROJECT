package soen342.project.DTOs;

import java.util.List;

public class TicketResponse {
    private Long ticketId;
    private String passengerName;
    private String passengerIdentifier;
    private String tripReference;
    private List<RouteDetails> routes;

    public TicketResponse(Long ticketId, String passengerName, String passengerIdentifier, String tripReference,
            List<RouteDetails> routes) {
        this.ticketId = ticketId;
        this.passengerName = passengerName;
        this.passengerIdentifier = passengerIdentifier;
        this.tripReference = tripReference;
        this.routes = routes;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public String getPassengerIdentifier() {
        return passengerIdentifier;
    }

    public String getTripReference() {
        return tripReference;
    }

    public List<RouteDetails> getRoutes() {
        return routes;
    }

}
