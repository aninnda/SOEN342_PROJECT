# Operation contracts for UC-02
CO3 – bookTrip
---

Operation contract: bookTrip(TripRequest)

Crossreference: UC-02 


### Preconditions:

- The system is initialized and running.

- The list of routes has been loaded from the persisted CSV file into memory.

- All Route objects referenced in the TripRequest exist.

- The TripRequest contains at least one Traveler with required information:

  - id

  - first_name

  - last_name

  - age

### The requested connection follows the layover policy:

- Acceptable daytime layover (e.g., ≤ 1–2 hours)

- Stricter night layover (e.g., ≤ 30 minutes)

- The database is reachable for persistence of the entities.

### Postconditions:

For each traveler in the request, a Traveler object is created (instance creation)
or an existing traveler record is updated (attribute modification).

- A Trip object is created (instance creation) and assigned a unique numeric ID.

- The Trip is associated with:

  - One or more Route objects (formation of association)

  - One or more Traveler objects (formation of association)

- For each traveler on the trip:

  - A Ticket object is created (instance creation)

  - The Ticket is associated to the Trip and the Traveler (formation of association)

- All created objects are persisted to the relational database.
