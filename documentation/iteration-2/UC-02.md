## Use Case: Book a trip

**Primary Actor:** Traveler (User)

## Description
To allow a client to select a desired connection and book one or more reservations (with tickets) for a trip.

---

## Preconditions:
- Routes have been loaded into the catalog (Use Case Load Records).
- The client has searched and identified a desired connection (Use Case Search for Connections).

---
## Main Success Scenario:
1. The client selects a desired connection from the search results.
2. The system prompts the client to provide traveller information for each person included in the trip: name, age, and ID.
3. The client enters the required information for all travellers.
4. The system validates that the client does not already have a reservation under their name for the same connection.
5. The system creates a new trip and assigns it a unique alphanumeric Trip ID.
6. For each traveller entered, the system creates a reservation under that trip.
7. For each reservation, the system generates a unique ticket with a numerical Ticket ID.
8. The system stores the trip, reservations, and tickets in persistent storage.
9. The system acknowledges successful booking of the trip and displays the Trip ID and ticket information to the client.
---

### Postconditions:
- A new trip record exists in the system, with one or more reservations and associated tickets.
- The client’s information and trip details are stored for future reference.
---
## Extensions

### Reservation Errors
- If a reservation already exists under the client’s name for the selected connection, the system notifies the client and prevents duplicate booking.
- If required information is missing or invalid, the system prompts the client to correct it before proceeding.