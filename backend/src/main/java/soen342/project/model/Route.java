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
        try {
            // Parse departure time in format "HH:MM"
            String[] depParts = departureTime.split(":");
            int depHour = Integer.parseInt(depParts[0]);
            int depMin = Integer.parseInt(depParts[1]);
            
            // Parse arrival time - handle format "HH:MM (+1d)" for next day
            boolean isNextDay = arrivalTime.contains("(+1d)");
            String arrTimeOnly = arrivalTime.replace(" (+1d)", "").trim();
            String[] arrParts = arrTimeOnly.split(":");
            int arrHour = Integer.parseInt(arrParts[0]);
            int arrMin = Integer.parseInt(arrParts[1]);
            
            // Convert to total minutes from midnight
            int depTotalMin = depHour * 60 + depMin;
            int arrTotalMin = arrHour * 60 + arrMin;
            
            // Handle next-day arrivals
            if (isNextDay || arrTotalMin < depTotalMin) {
                arrTotalMin += 24 * 60; // Add 24 hours
            }

            // Calculate duration in minutes
            int durationMin = arrTotalMin - depTotalMin;
            return durationMin / 60.0; // Convert to hours with decimal
            
        } catch (Exception e) {
            // If parsing fails, return 0
            return 0.0;
        }
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
    
    // Helper method to get formatted duration string
    public String getFormattedTripDuration() {
        int hours = (int) tripDuration;
        int minutes = (int) ((tripDuration - hours) * 60);
        
        if (hours == 0) {
            return String.format("%dm", minutes);
        } else if (minutes == 0) {
            return String.format("%dh", hours);
        } else {
            return String.format("%dh %dm", hours, minutes);
        }
    }
}
