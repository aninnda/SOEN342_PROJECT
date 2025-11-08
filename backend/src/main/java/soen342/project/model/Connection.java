package soen342.project.model;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import soen342.project.util.DateTimeUtils;

public class Connection {

    private List<Route> routes;

    private double totalMovingDuration; // in hours
    private double connectionChangeDuration; // in hours
    private double totalTripDuration; // in hours
    private int totalFirstClassTicketRate;
    private int totalSecondClassTicketRate;
    private int numberOfTransfers;

    /**
     * layovers between routes in the connection
     */
    private Layover[] layovers;

    /**
     * use if no layovers
     * @param routes
     */
    public Connection(List<Route> routes) {
        this.routes = routes;
        this.totalMovingDuration = calculateTotalMovingDuration(routes);
        this.connectionChangeDuration = 0;
        this.totalTripDuration = this.totalMovingDuration + this.connectionChangeDuration;
        this.totalFirstClassTicketRate = routes.stream().mapToInt(Route::getFirstClassTicketRate).sum();
        this.totalSecondClassTicketRate = routes.stream().mapToInt(Route::getSecondClassTicketRate).sum();
        this.numberOfTransfers = 0;
        this.layovers = new Layover[0];
    }

    /**
     * use if layovers are present
     * @param routes
     * @param layovers
     */
    public Connection(List<Route> routes, Layover[] layovers) {
        this.routes = routes;
        this.totalMovingDuration = calculateTotalMovingDuration(routes);
        this.connectionChangeDuration = calculateConnectionChangeDuration(layovers);
        this.totalTripDuration = this.totalMovingDuration + this.connectionChangeDuration;
        this.totalFirstClassTicketRate = routes.stream().mapToInt(Route::getFirstClassTicketRate).sum();
        this.totalSecondClassTicketRate = routes.stream().mapToInt(Route::getSecondClassTicketRate).sum();
        this.numberOfTransfers = routes.size() - 1;
        this.layovers = layovers;
    }

    private double calculateTotalMovingDuration(List<Route> routes) {
        return routes.stream().mapToDouble(Route::getTripDuration).sum();
    }

    /**
     * This function returns the total duration spent during connection changes
     * between routes.
     * It finds the shortest time difference based on the days and times of arrival
     * and departure.
     */
    private double calculateConnectionChangeDuration(Layover[] layovers) {
        double totalLayoverDuration = 0;
        for (Layover layover : layovers) {
            totalLayoverDuration += layover.getDuration();
        }
        return totalLayoverDuration;
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

    public Layover[] getLayovers() {
        return layovers;
    }

    public void setLayovers(Layover[] layovers) {
        this.layovers = layovers;
    };
};
