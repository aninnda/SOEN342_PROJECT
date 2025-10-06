package soen342.project.model;

import java.time.DayOfWeek;
import java.util.List;

public class Route {
    private String routeId;
    private String departureCity;
    private String arrivalCity;
    private String departureTime;
    private String arrivalTime;
    private String trainType;
    private List<DayOfWeek> daysOfOperation;
    private int firstClassTicketRate;
    private int secondClassTicketRate;

    private double tripDuration; // in hours

    public Route(String routeId, String departureCity, String arrivalCity, String departureTime,
            String arrivalTime, String trainType, List<DayOfWeek> daysOfOperation,
            int firstClassTicketRate, int secondClassTicketRate) {
        this.routeId = routeId;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.trainType = trainType;
        this.daysOfOperation = daysOfOperation;
        this.firstClassTicketRate = firstClassTicketRate;
        this.secondClassTicketRate = secondClassTicketRate;
        this.tripDuration = calculateRouteDuration(departureTime, arrivalTime);
    }


    private double calculateRouteDuration(String departureTime, String arrivalTime) {
        // TODO implement route duration calculation
        return 0;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public void setArrivalCity(String arrivalCity) {
        this.arrivalCity = arrivalCity;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
        this.tripDuration = calculateRouteDuration(this.departureTime, this.arrivalTime);
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
        this.tripDuration = calculateRouteDuration(this.departureTime, this.arrivalTime);
    }

    public String getTrainType() {
        return trainType;
    }

    public void setTrainType(String trainType) {
        this.trainType = trainType;
    }

    public List<DayOfWeek> getDaysOfOperation() {
        return daysOfOperation;
    }

    public void setDaysOfOperation(List<DayOfWeek> daysOfOperation) {
        this.daysOfOperation = daysOfOperation;
    }

    public int getFirstClassTicketRate() {
        return firstClassTicketRate;
    }

    public void setFirstClassTicketRate(int firstClassTicketRate) {
        this.firstClassTicketRate = firstClassTicketRate;
    }

    public int getSecondClassTicketRate() {
        return secondClassTicketRate;
    }

    public void setSecondClassTicketRate(int secondClassTicketRate) {
        this.secondClassTicketRate = secondClassTicketRate;
    }

    public double getTripDuration() {
        return tripDuration;
    }

    public void setTripDuration(double tripDuration) {
        this.tripDuration = tripDuration;
    }
}
