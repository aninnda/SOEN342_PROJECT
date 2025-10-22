package soen342.project.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import soen342.project.model.Trip;

public interface TripRepository extends JpaRepository<Trip, Long> {
    // Find trips by traveler identifier

    List<Trip> findByTraveler_Identifier(String travelerIdentifier);

    // Find trips by traveler identifier and name fragment (useful for last-name search)
    List<Trip> findByTraveler_IdentifierAndTraveler_NameContainingIgnoreCase(String travelerIdentifier, String travelerName);

    // Find trips by trip ID
    List<Trip> findById(String id);

}
