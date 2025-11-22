# Operation contracts for UC-03


## CO4 – viewTrips

Operation contract: viewTrips(travelerId, lastName) (or) viewTripById(tripId)

Crossreference: UC-03

### Preconditions:

- The system is initialized and running.

- The database contains persisted Trip, Traveler, and Ticket records.

- For viewTrips(travelerId,lastName)

  - travelerId exists or is supplied to filter trips.

- For viewTripById(tripId)

  - tripId is valid and parseable.

### Postconditions:

- The system retrieves all trips associated with the provided traveler (instance retrieval).

  - Both current trips (today or future dates) and history trips (past dates) are included.

- For each returned Trip:

  - Associated tickets are retrieved (association traversal)

  - Associated travelers are retrieved (association traversal)
  
  - Associated route details are reconstructed from the in-memory Route definitions

- No data is modified. (read-only operation)
