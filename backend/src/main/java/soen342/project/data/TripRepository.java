package soen342.project.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import soen342.project.model.Trip;

public interface TripRepository extends JpaRepository<Trip, Long> {
    // Find trips by traveler identifier

    List<Trip> findByTravelers_Id(String travelerId);

    // Find trips by traveler identifier and name fragment (useful for last-name search)
    List<Trip> findByTravelers_IdAndTravelers_LastNameContainingIgnoreCase(String travelerId, String travelerName);

    // Note: findById(Long id) is already provided by JpaRepository
    // If you need to search by something else, create a different method name

}
