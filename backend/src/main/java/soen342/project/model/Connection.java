package soen342.project.model;

import java.time.LocalTime;
import java.util.List;

public class Connection {

    private List<Route> routes;

    private double totalMovingDuration; // in hours
    private double connectionChangeDuration; // in hours
    private double totalTripDuration; // in hours
    private int totalFirstClassTicketRate;
    private int totalSecondClassTicketRate;
    private int numberOfTransfers;

    private String departureCity;
    private String arrivalCity;
    private String departureTime;
    private String arrivalTime;

    public Connection(List<Route> routes) {
        this.routes = routes;
        this.totalMovingDuration = calculateTotalMovingDuration(routes);
        this.connectionChangeDuration = calculateConnectionChangeDuration(routes);
        this.totalTripDuration = this.totalMovingDuration + this.connectionChangeDuration;
        this.totalFirstClassTicketRate = routes.stream().mapToInt(Route::getFirstClassTicketRate).sum();
        this.totalSecondClassTicketRate = routes.stream().mapToInt(Route::getSecondClassTicketRate).sum();
        this.numberOfTransfers = routes.size() - 1;

        this.departureCity = routes.get(0).getDepartureCity();
        this.arrivalCity = routes.get(routes.size() - 1).getArrivalCity();
        this.departureTime = routes.get(0).getDepartureTime();
        this.arrivalTime = routes.get(routes.size() - 1).getArrivalTime();
    }

    private double calculateTotalMovingDuration(List<Route> routes) {
        return routes.stream().mapToDouble(Route::getTripDuration).sum();
    }

    private double calculateConnectionChangeDuration(List<Route> routes) {
        // TODO implement connection change duration calculation
        return 0;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    public double getTotalMovingDuration() {
        return totalMovingDuration;
    }

    public void setTotalMovingDuration(double totalMovingDuration) {
        this.totalMovingDuration = totalMovingDuration;
    }

    public double getConnectionChangeDuration() {
        return connectionChangeDuration;
    }

    public void setConnectionChangeDuration(double connectionChangeDuration) {
        this.connectionChangeDuration = connectionChangeDuration;
    }

    public double getTotalTripDuration() {
        return totalTripDuration;
    }

    public void setTotalTripDuration(double totalTripDuration) {
        this.totalTripDuration = totalTripDuration;
    }

    public int getTotalFirstClassTicketRate() {
        return totalFirstClassTicketRate;
    }

    public void setTotalFirstClassTicketRate(int totalFirstClassTicketRate) {
        this.totalFirstClassTicketRate = totalFirstClassTicketRate;
    }

    public int getTotalSecondClassTicketRate() {
        return totalSecondClassTicketRate;
    }

    public void setTotalSecondClassTicketRate(int totalSecondClassTicketRate) {
        this.totalSecondClassTicketRate = totalSecondClassTicketRate;
    }

    public int getNumberOfTransfers() {
        return numberOfTransfers;
    }

    public void setNumberOfTransfers(int numberOfTransfers) {
        this.numberOfTransfers = numberOfTransfers;
    }

}
