package soen342.project.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import soen342.project.model.Trip;

public interface TripRepository extends JpaRepository<Trip, Long> {
	// Find trips by identifier and name fragment (useful for last-name search)
	List<Trip> findBytravelerIdentifierAndTravelerNameContainingIgnoreCase(String travelerIdentifier, String travelerName);

	// convenience: find by identifier only
	List<Trip> findBytravelerIdentifier(String travelerIdentifier);

	// Find trips by trip reference
	List<Trip> findByTripReference(String tripReference);

}
