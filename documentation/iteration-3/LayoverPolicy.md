# Layover policy

This file documents the policy for the adjustment to UC-01, searching for connections, aimed at avoiding suggesting indirect connections that would lead to unconditional layover times.


## Current implementation

Given a user searches for a connection between two cities
When no direct connections exist
Then the SearchService looks for indirect connections

Currently, the departure time & arrival time filters are ignored for indirect connections.
This is because, given an ordered sequence of routes, the system will return a valid connection so long as the sequence starts from the `departureCity` and ends at the `endCity`.

For a given combination/sequence of routes, `SearchService` finds the combination of departure days for each route part of the sequence such that the layover time is the shortest (among all other combinations). This layover time is then the one that's returned.

Not only is the user's preferred date-time of arrival/departure ignored, but also, we are returning connections representing combinations that may have layovers that span across several days, because those combinations are valid in the sense that they:
1. bring the user from point A to point B, regardless of the time they take
2. nonetheless display the shortest layover time given all combinations of start dates/route.

## Policy

Returned indirect connections will contain layovers that are:
- no longer than 1 hour long, if the layover starts between 7 pm to 5 am (exclusive).
- no longer than 3 hours long, if the layover starts between 5 am to 7 pm (inclusive).

For connections with more than a single layover, the policy must apply to both layovers for it to be suggested.

Additionally, indirect connections will respect the user's start/end date-time filters.