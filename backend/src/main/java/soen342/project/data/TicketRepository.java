package soen342.project.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import soen342.project.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Ticket findById(long id);

    List<Ticket> findByTravelerId(long travelerId);

    List<Ticket> findByTripId(long tripId);

    Ticket findByTravelerIdAndTripId(long travelerId, long tripId);

}
