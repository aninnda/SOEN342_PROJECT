package soen342.project.DTOs;

public class RouteDetails {
    private String routeId;
    private String departureCity;
    private String arrivalCity;
    private String departureTime;
    private String arrivalTime;
    private double tripDuration;

    public RouteDetails(String routeId, String departureCity, String arrivalCity, String departureTime,
            String arrivalTime, double tripDuration) {
        this.routeId = routeId;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.tripDuration = tripDuration;
    }

    public String getRouteId() {
        return routeId;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public double getTripDuration() {
        return tripDuration;
    }

}