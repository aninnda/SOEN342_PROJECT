## Use Case: View Trips

**Primary Actor:** Traveler (User)

## Description
To allow a traveler to view details of their past, current, or upcoming trips.

---

## Preconditions:
- The traveler must have a valid traveler ID and last name.  
- The system must already contain stored booking records (trips).

---
## Main Success Scenario:
1. The client selects the option to view trips
2. The system prompts the traveler to enter their last name and traveler ID.
3. The traveler provides the required information.
4. The system verifies the traveler’s credentials.
5. The system **includes** the **Load Records** use case to retrieve the traveler’s trip data from the database.
6. The system displays a list of the traveler’s past, current, and upcoming trips.
   - Trip ID
   - Connection details (departure, arrival, date, time)
   - Ticket and reservation information
7. The traveler can select a specific trip to view detailed information (such as connection type, departure, arrival, and booking status).
8. The client can view individual trip details as desired.
---

### Postconditions:
- The traveler’s trips are successfully displayed.
- No data is modified during this process.

---
## Extensions
### Included Use Case:
-   **Load Records** retrieves the traveler's trip information from the database.

### No trips found
- If no trips are found for the entered credentials, the system displays a message indicating that no records exist.

- If the provided information is invalid or incomplete, the system prompts the client to re-enter it.