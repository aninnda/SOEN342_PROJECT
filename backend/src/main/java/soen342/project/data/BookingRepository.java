package soen342.project.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import soen342.project.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	// Find bookings by identifier and name fragment (useful for last-name search)
	List<Booking> findBytravelerIdentifierAndTravelerNameContainingIgnoreCase(String travelerIdentifier, String travelerName);

	// convenience: find by identifier only
	List<Booking> findBytravelerIdentifier(String travelerIdentifier);

	// Find bookings by trip reference
	List<Booking> findByTripReference(String tripReference);

}
