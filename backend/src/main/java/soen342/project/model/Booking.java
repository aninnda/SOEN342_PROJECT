package soen342.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passengerName;
    private Integer passengerAge;
    private String passengerIdentifier; // mix of letters and numbers
    private java.util.List<String> routeIds;
    private String tripReference;

    public Booking() {}

    public Booking(String passengerName, Integer passengerAge, String passengerIdentifier, java.util.List<String> routeIds, String tripReference) {
        this.passengerName = passengerName;
        this.passengerAge = passengerAge;
        this.passengerIdentifier = passengerIdentifier;
        this.routeIds = routeIds;
        this.tripReference = tripReference;
    }
    public String getTripReference() {
        return tripReference;
    }

    public void setTripReference(String tripReference) {
        this.tripReference = tripReference;
    }

    public Long getId() {
        return id;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public Integer getPassengerAge() {
        return passengerAge;
    }

    public void setPassengerAge(Integer passengerAge) {
        this.passengerAge = passengerAge;
    }

    public String getPassengerIdentifier() {
        return passengerIdentifier;
    }

    public void setPassengerIdentifier(String passengerIdentifier) {
        this.passengerIdentifier = passengerIdentifier;
    }

    public java.util.List<String> getRouteIds() {
        return routeIds;
    }

    public void setRouteIds(java.util.List<String> routeIds) {
        this.routeIds = routeIds;
    }
}
