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

    private String travelerName;
    private Integer travelerAge;
    private String travelerIdentifier; // mix of letters and numbers
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "booking_route_ids", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "route_id")
    private List<String> routeIds;
    
    private String tripReference;

    public Booking() {}

    public Booking(String travelerName, Integer travelerAge, String travelerIdentifier, List<String> routeIds, String tripReference) {
        this.travelerName = travelerName;
        this.travelerAge = travelerAge;
        this.travelerIdentifier = travelerIdentifier;
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

    public String gettravelerName() {
        return travelerName;
    }

    public void settravelerName(String travelerName) {
        this.travelerName = travelerName;
    }

    public Integer gettravelerAge() {
        return travelerAge;
    }

    public void settravelerAge(Integer travelerAge) {
        this.travelerAge = travelerAge;
    }

    public String gettravelerIdentifier() {
        return travelerIdentifier;
    }

    public void settravelerIdentifier(String travelerIdentifier) {
        this.travelerIdentifier = travelerIdentifier;
    }

    public List<String> getRouteIds() {
        return routeIds;
    }

    public void setRouteIds(List<String> routeIds) {
        this.routeIds = routeIds;
    }
}
