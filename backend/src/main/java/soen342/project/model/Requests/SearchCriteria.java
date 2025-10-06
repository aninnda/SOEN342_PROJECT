package soen342.project.model.Requests;

import java.time.LocalDateTime;

public class SearchCriteria {

    private String departureCity;
    private String arrivalCity;
    private LocalDateTime departureDateTime; // mutually exclusive from arrivalDateTime
    private LocalDateTime arrivalDateTime; // mutually exclusive from departureDateTime
    private String trainType;
    private int maxPrice;

    // take strings from query params and convert to appropriate types
    public SearchCriteria(
            String departureCity,
            String arrivalCity,
            String departureDateTime,
            String arrivalDateTime,
            String trainType,
            String maxPrice) {
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureDateTime = departureDateTime != null ? LocalDateTime.parse(departureDateTime) : null;
        this.arrivalDateTime = arrivalDateTime != null ? LocalDateTime.parse(arrivalDateTime) : null;
        this.trainType = trainType;
        this.maxPrice = maxPrice != null ? Integer.parseInt(maxPrice) : 0;
    }

    public SearchCriteria() {

    }
}
