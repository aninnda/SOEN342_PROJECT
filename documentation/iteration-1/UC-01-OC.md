# Operation contracts for UC-01

## CO1 - search

Operation contract: search(SearchCriteria)

Crossreference: UC-01

Preconditions:
- The System is initalized, i.e. it is running and has loaded the list of routes from the persisted data storage (.csv file).
- The predefined Route objects are instantiated.
- The criteria is defined (exists) and is correctly formed.

Postcondtions:
- Connections that fit the search criteria are created (instance creation)
- Connections are associated with the Routes they are formed from (formation of association)
- Each connection's total duration is calculated and assigned to these associations (attribute modification)

## CO2 - sort

Operation contract: sort(SearchType, SearchDirection)

Crossreference: UC-01

Preconditions:
- A valid search has been performed, and results were:
    1. found (direct/indirect)
    2. displayed to the user via the user interface.
- SearchType is one of the following:
    - tripDuration
    - totalLayoverDuration (for indirect connections)
    - maxFirstClassPrice
    - maxSecondClassPrice
- SearchDirection is one of the following:
    - Ascending
    - Descending

Postconditions:
- The list of connections is sorted based on type and direction(attribute modification).