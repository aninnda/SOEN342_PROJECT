### Specify an OCL expression for the method that creates a reservation. 

context TripService::createTrip(tr: Trip) : Map

pre:

    tr <> null and
    tr.travelers->size() >= 1 and
    tr.routeIds->size() >= 1

post:

    -- Exactly one ticket created for each traveler
    
    Ticket.allInstances()->size() =
        Ticket.allInstances()@pre->size() + tr.travelers->size()
        
    and
    
    -- Each traveler has a ticket for the newly created trip
    
    tr.travelers->forAll(traveler |
        Ticket.allInstances()->exists(ticket |
            ticket.traveler = traveler and
            ticket.trip = result('trip') and
            ticket.issuedAt <> null
        )
    )
--- 





### Specify an OCL expression for the class that represents a reservation. 

context Ticket

inv ValidTicket:

    self.traveler <> null and
    self.trip <> null and
    self.issuedAt <> null and
    self.trip.travelers->includes(self.traveler)

inv UniqueTicketPerTravelerTrip:

    Ticket.allInstances()
        ->select(t | t.traveler = self.traveler and t.trip = self.trip)
        ->size() = 1

inv UniqueTicketId:
    Ticket.allInstances()->isUnique(t | t.id)
<img width="468" height="629" alt="image" src="https://github.com/user-attachments/assets/1adc5054-e769-4fa4-9663-bb6505800dfd" />
