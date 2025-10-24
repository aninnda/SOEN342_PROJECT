package soen342.project.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import soen342.project.model.Trip;

public interface TripRepository extends JpaRepository<Trip, Long> {
    // Find trips by traveler id

    List<Trip> findByTravelers_Id(String travelerId);

}
