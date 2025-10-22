package soen342.project.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import soen342.project.DTOs.RouteDetails;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "traveler_id", referencedColumnName = "id")
    private Traveler traveler;

    @ManyToOne
    @JoinColumn(name = "trip_id", referencedColumnName = "id")
    private Trip trip;

    private LocalDateTime issuedAt;

    public Ticket() {
    }

    public Ticket(Traveler traveler, Trip trip) {
        this.traveler = traveler;
        this.trip = trip;
        issuedAt = LocalDateTime.now();
    }

    public long getId() {
        return id;
    }

    public Traveler getTraveler() {
        return traveler;
    }

    public Trip getTrip() {
        return trip;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

}
