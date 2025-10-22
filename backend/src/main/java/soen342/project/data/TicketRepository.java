package soen342.project.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import soen342.project.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Ticket findById(long id);

    List<Ticket> findByTraveler_Id(String travelerId);

    List<Ticket> findByTrip_Id(Long tripId);

    Ticket findByTraveler_IdAndTrip_Id(String travelerId, Long tripId);

}
