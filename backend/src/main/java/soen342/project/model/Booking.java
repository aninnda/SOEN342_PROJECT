package soen342.project.model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passengerName;
    private Integer passengerAge;
    private String passengerIdentifier; // mix of letters and numbers
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "booking_route_ids", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "route_id")
    private List<String> routeIds;
    
    private String tripReference;

    public Booking() {}

    public Booking(String passengerName, Integer passengerAge, String passengerIdentifier, List<String> routeIds, String tripReference) {
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

    public List<String> getRouteIds() {
        return routeIds;
    }

    public void setRouteIds(List<String> routeIds) {
        this.routeIds = routeIds;
    }
}
