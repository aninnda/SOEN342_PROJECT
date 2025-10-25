package soen342.project.DTOs;

import java.util.List;

@Deprecated(forRemoval = true)
public class TicketResponse {
    private Long ticketId;
    private String travelerName;
    private String travelerIdentifier;
    private String tripReference;
    private List<RouteDetails> routes;

    public TicketResponse(Long ticketId, String travelerName, String travelerIdentifier, String tripReference,
            List<RouteDetails> routes) {
        this.ticketId = ticketId;
        this.travelerName = travelerName;
        this.travelerIdentifier = travelerIdentifier;
        this.tripReference = tripReference;
        this.routes = routes;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public String gettravelerName() {
        return travelerName;
    }

    public String gettravelerIdentifier() {
        return travelerIdentifier;
    }

    public String getTripReference() {
        return tripReference;
    }

    public List<RouteDetails> getRoutes() {
        return routes;
    }

}
