package soen342.project.model;

import java.time.LocalDateTime;
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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "trip_travelers",
            joinColumns = @JoinColumn(name = "trip_id"),
            inverseJoinColumns = @JoinColumn(name = "traveler_id"))
    private List<Traveler> travelers;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "trip_route_ids", joinColumns = @JoinColumn(name = "trip_id"))
    @Column(name = "route_id")
    private List<String> routeIds;

    private LocalDateTime initialDepartureDateTime;

    public Trip() {
    }

    public Trip(List<Traveler> travelers, List<String> routeIds, LocalDateTime initialDepartureDateTime) {
        this.travelers = travelers;
        this.routeIds = routeIds;
        this.initialDepartureDateTime = initialDepartureDateTime;
    }

    public Trip(Trip trip) {
        this.id = trip.id;
        this.travelers = trip.travelers;
        this.routeIds = trip.routeIds;
        this.initialDepartureDateTime = trip.initialDepartureDateTime;
    }

    public Long getId() {
        return id;
    }

    public List<Traveler> getTravelers() {
        return travelers;
    }

    public LocalDateTime getInitialDepartureDateTime() {
        return initialDepartureDateTime;
    }

    public void setTravelers(List<Traveler> travelers) {
        this.travelers = travelers;
    }

    public List<String> getRouteIds() {
        return routeIds;
    }

    public void setRouteIds(List<String> routeIds) {
        this.routeIds = routeIds;
    }
}
