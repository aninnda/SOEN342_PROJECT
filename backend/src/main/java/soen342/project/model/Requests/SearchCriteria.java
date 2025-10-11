package soen342.project.model.Requests;

import java.time.DayOfWeek;

public class SearchCriteria {

    private String departureCity;
    private String arrivalCity;
    private String departureTime; // Format: "HH:MM" (e.g., "08:30")
    private String arrivalTime; // Format: "HH:MM" (e.g., "14:45")
    private String trainType;
    private int maxFirstClassPrice; // Maximum price for first class
    private int maxSecondClassPrice; // Maximum price for second class
    private DayOfWeek dayOfWeek; // For filtering by specific day of operation

    // Constructor for search parameters
    public SearchCriteria(
            String departureCity,
            String arrivalCity,
            String departureTime,
            String arrivalTime,
            String trainType,
            String maxFirstClassPrice,
            String maxSecondClassPrice,
            String dayOfWeek) {
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.trainType = trainType;
        this.maxFirstClassPrice = maxFirstClassPrice != null && !maxFirstClassPrice.trim().isEmpty()
                ? Integer.parseInt(maxFirstClassPrice)
                : 0;
        this.maxSecondClassPrice = maxSecondClassPrice != null && !maxSecondClassPrice.trim().isEmpty()
                ? Integer.parseInt(maxSecondClassPrice)
                : 0;
        this.dayOfWeek = dayOfWeek != null && !dayOfWeek.trim().isEmpty() ? DayOfWeek.valueOf(dayOfWeek.toUpperCase())
                : null;
    }

    public SearchCriteria() {

    }

    public SearchCriteria(String departureCity, String arrivalCity, String departureTime, String arrivalTime,
            String trainType, int maxFirstClassPrice, int maxSecondClassPrice, DayOfWeek dayOfWeek) {
        this.arrivalCity = arrivalCity;
        this.departureCity = departureCity;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.trainType = trainType;
        this.maxFirstClassPrice = maxFirstClassPrice;        
        this.maxSecondClassPrice = maxSecondClassPrice;
        this.dayOfWeek = dayOfWeek;
    }

    // Getters
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

    public String getTrainType() {
        return trainType;
    }

    public int getMaxFirstClassPrice() {
        return maxFirstClassPrice;
    }

    public int getMaxSecondClassPrice() {
        return maxSecondClassPrice;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }
}
