package soen342.project.service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import soen342.project.data.Database;
import soen342.project.model.Connection;
import soen342.project.model.Route;
import soen342.project.model.Requests.SearchCriteria;
import soen342.project.model.Responses.SearchResponseModel;

public class SearchService {
    public SearchResponseModel search(SearchCriteria criteria) {
        List<Connection> connections = new ArrayList<>();

        // Get all routes from database
        List<Route> allRoutes = Database.getInstance().getRoutes();

        // Apply filters to routes
        List<Route> filteredRoutes = filterRoutes(allRoutes, criteria);

        // Convert filtered routes to connections
        for (Route route : filteredRoutes) {
            connections.add(new Connection(List.of(route)));
        }

        boolean containsIndirectConnections = false;

        if (connections.isEmpty()) {
            containsIndirectConnections = true;
        }

        if (containsIndirectConnections) {
            connections.addAll(searchIndirectConnections(criteria, allRoutes));
        }

        return new SearchResponseModel(connections, containsIndirectConnections);
    }

    private List<Connection> searchIndirectConnections(SearchCriteria criteria, List<Route> allRoutes) {

        List<Connection> indirectConnections = new ArrayList<>();

        List<Route> startRoute = filterRoutes(allRoutes, new SearchCriteria(
                criteria.getDepartureCity(),
                null,
                criteria.getDepartureTime(),
                null,
                criteria.getTrainType(),
                criteria.getMaxFirstClassPrice(),
                criteria.getMaxSecondClassPrice(),
                criteria.getDayOfWeek()));

        List<Route> endRoute = filterRoutes(allRoutes, new SearchCriteria(
                null,
                criteria.getArrivalCity(),
                null,
                criteria.getArrivalTime(),
                criteria.getTrainType(),
                criteria.getMaxFirstClassPrice(),
                criteria.getMaxSecondClassPrice(),
                criteria.getDayOfWeek()));

        for (Route start : startRoute) {
            for (Route end : endRoute) {
                // Ensure the arrival city of the start route matches the departure city of the
                // end route
                if (start.getArrivalCity().equalsIgnoreCase(end.getDepartureCity())) {
                    // Ensure the arrival time of the start route is before the departure time of
                    // the end route
                    indirectConnections.add(new Connection(List.of(start, end)));
                }
            }
        }

        return indirectConnections;
    }

    // filtering the routes based on the criteria provided by the user
    private List<Route> filterRoutes(List<Route> routes, SearchCriteria criteria) {
        return routes.stream()
                .filter(route -> matchesDepartureCity(route, criteria))
                .filter(route -> matchesArrivalCity(route, criteria))
                .filter(route -> matchesDepartureTime(route, criteria))
                .filter(route -> matchesArrivalTime(route, criteria))
                .filter(route -> matchesTrainType(route, criteria))
                .filter(route -> matchesDayOfOperation(route, criteria))
                .filter(route -> matchesMaxPrice(route, criteria))
                .collect(Collectors.toList());
    }

    private boolean matchesDepartureCity(Route route, SearchCriteria criteria) {
        if (criteria.getDepartureCity() == null || criteria.getDepartureCity().trim().isEmpty()) {
            return true;
        }
        return route.getDepartureCity() != null &&
                route.getDepartureCity().toLowerCase().contains(criteria.getDepartureCity().toLowerCase().trim());
    }

    private boolean matchesArrivalCity(Route route, SearchCriteria criteria) {
        if (criteria.getArrivalCity() == null || criteria.getArrivalCity().trim().isEmpty()) {
            return true;
        }
        return route.getArrivalCity() != null &&
                route.getArrivalCity().toLowerCase().contains(criteria.getArrivalCity().toLowerCase().trim());
    }

    private boolean matchesDepartureTime(Route route, SearchCriteria criteria) {
        if (criteria.getDepartureTime() == null || criteria.getDepartureTime().trim().isEmpty()) {
            return true;
        }
        try {
            LocalTime routeDepartureTime = LocalTime.parse(route.getDepartureTime());
            LocalTime criteriaTime = LocalTime.parse(criteria.getDepartureTime());
            return routeDepartureTime.equals(criteriaTime) ||
                    routeDepartureTime.isAfter(criteriaTime);
        } catch (Exception e) {
            // If parsing fails, assume it matches to avoid filtering out valid routes
            return true;
        }
    }

    private boolean matchesArrivalTime(Route route, SearchCriteria criteria) {
        if (criteria.getArrivalTime() == null || criteria.getArrivalTime().trim().isEmpty()) {
            return true;
        }
        try {
            LocalTime routeArrivalTime = LocalTime.parse(route.getArrivalTime());
            LocalTime criteriaTime = LocalTime.parse(criteria.getArrivalTime());
            return routeArrivalTime.equals(criteriaTime) ||
                    routeArrivalTime.isBefore(criteriaTime);
        } catch (Exception e) {
            // If parsing fails, assume it matches to avoid filtering out valid routes
            return true;
        }
    }

    private boolean matchesTrainType(Route route, SearchCriteria criteria) {
        if (criteria.getTrainType() == null || criteria.getTrainType().trim().isEmpty()) {
            return true;
        }
        return route.getTrainType() != null &&
                route.getTrainType().toLowerCase().contains(criteria.getTrainType().toLowerCase().trim());
    }

    private boolean matchesDayOfOperation(Route route, SearchCriteria criteria) {
        if (criteria.getDayOfWeek() == null) {
            return true;
        }
        return route.getDaysOfOperation() != null &&
                route.getDaysOfOperation().contains(criteria.getDayOfWeek());
    }

    private boolean matchesMaxPrice(Route route, SearchCriteria criteria) {
        boolean firstClassMatch = true;
        boolean secondClassMatch = true;

        // Check first class price filter
        if (criteria.getMaxFirstClassPrice() > 0) {
            firstClassMatch = route.getFirstClassTicketRate() <= criteria.getMaxFirstClassPrice();
        }

        // Check second class price filter
        if (criteria.getMaxSecondClassPrice() > 0) {
            secondClassMatch = route.getSecondClassTicketRate() <= criteria.getMaxSecondClassPrice();
        }

        // If no price filters specified, match all
        if (criteria.getMaxFirstClassPrice() <= 0 && criteria.getMaxSecondClassPrice() <= 0) {
            return true;
        }

        // Route matches if it satisfies the specified price constraints
        return firstClassMatch && secondClassMatch;
    }

    // City suggestion methods
    public List<String> suggestDepartureCities(String query) {
        return suggestCities(query, true);
    }

    public List<String> suggestArrivalCities(String query) {
        return suggestCities(query, false);
    }

    public List<String> suggestCities(String query, boolean isDeparture) {
        if (query == null || query.trim().isEmpty()) {
            return new ArrayList<>();
        }

        String lowerQuery = query.toLowerCase().trim();
        List<Route> allRoutes = Database.getInstance().getRoutes();

        return allRoutes.stream()
                .map(route -> isDeparture ? route.getDepartureCity() : route.getArrivalCity())
                .filter(city -> city != null && city.toLowerCase().startsWith(lowerQuery))
                .distinct()
                .sorted()
                .limit(10) // Limit to top 10 suggestions
                .collect(Collectors.toList());
    }

    // Get all unique cities (for comprehensive autocomplete)
    public List<String> getAllCities() {
        List<Route> allRoutes = Database.getInstance().getRoutes();
        List<String> allCities = new ArrayList<>();

        // Add all departure cities
        allRoutes.stream()
                .map(Route::getDepartureCity)
                .filter(city -> city != null)
                .forEach(allCities::add);

        // Add all arrival cities
        allRoutes.stream()
                .map(Route::getArrivalCity)
                .filter(city -> city != null)
                .forEach(allCities::add);

        return allCities.stream()
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    // Get train types for autocomplete
    public List<String> getAllTrainTypes() {
        List<Route> allRoutes = Database.getInstance().getRoutes();

        return allRoutes.stream()
                .map(Route::getTrainType)
                .filter(trainType -> trainType != null)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
