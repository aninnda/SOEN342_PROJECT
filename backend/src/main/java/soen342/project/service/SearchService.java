package soen342.project.service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import soen342.project.data.RouteRepository;
import soen342.project.model.Connection;
import soen342.project.model.Layover;
import soen342.project.model.Route;
import soen342.project.model.Requests.SearchCriteria;
import soen342.project.model.Responses.SearchResponseModel;
import soen342.project.util.LayoverUtils;

import soen342.project.util.SearchCriteriaUtils;

public class SearchService {
    public SearchResponseModel search(SearchCriteria criteria) {
        List<Connection> connections = new ArrayList<>();

        // Debug: log search criteria
        System.out.println("[DEBUG] Search criteria: " + criteria);

        // Get all routes from database
        List<Route> allRoutes = RouteRepository.getInstance().getRoutes();

        // Apply filters to routes
        List<Route> filteredRoutes = filterRoutes(allRoutes, criteria);

        // Debug: log number of direct connections found
        System.out.println("[DEBUG] Direct connections found: " + filteredRoutes.size());

        // Convert filtered routes to connections
        for (Route route : filteredRoutes) {
            connections.add(new Connection(List.of(route)));
        }

        boolean containsIndirectConnections = false;

        if (connections.isEmpty()) {
            connections.addAll(searchIndirectConnections(criteria));
            if (!connections.isEmpty()) {
                containsIndirectConnections = true;
            }
        }

        // Debug: log number of connections returned
        System.out.println("[DEBUG] Total connections returned: " + connections.size());

        return new SearchResponseModel(connections, containsIndirectConnections);
    }

    private List<Connection> searchIndirectConnections(SearchCriteria criteria) {

        List<Connection> indirectConnections = new ArrayList<>();

        List<Connection> oneStopConnections = searchOneStops(criteria);
        List<Connection> twoStopConnections = searchTwoStops(criteria);

        SearchCriteriaUtils.filterForIndirectMaxPrices(oneStopConnections, criteria);
        SearchCriteriaUtils.filterForIndirectMaxPrices(twoStopConnections, criteria);

        indirectConnections.addAll(oneStopConnections);
        indirectConnections.addAll(twoStopConnections);

        return indirectConnections;
    }

    private List<Connection> searchOneStops(SearchCriteria criteria) {

        List<Connection> oneStopConnections = new ArrayList<>();
        List<Route> candidateStartRoutes = RouteRepository.getInstance()
                .getRoutesByDepartureCity(criteria.getDepartureCity());
        List<Route> candidateEndRoutes = RouteRepository.getInstance()
                .getRoutesByArrivalCity(criteria.getArrivalCity());
        List<Route> filteredCandidateStartRoutes = filterRoutes(candidateStartRoutes, new SearchCriteria(
                criteria.getDepartureCity(),
                null,
                criteria.getDepartureTime(),
                null,
                criteria.getTrainType(),
                criteria.getMaxFirstClassPrice(),
                criteria.getMaxSecondClassPrice(),
                criteria.getDayOfWeek()));
        List<Route> filteredCandidateEndRoutes = filterRoutes(candidateEndRoutes, new SearchCriteria(
                null,
                criteria.getArrivalCity(),
                null,
                criteria.getArrivalTime(),
                criteria.getTrainType(),
                criteria.getMaxFirstClassPrice(),
                criteria.getMaxSecondClassPrice(),
                null));

        List<Route[]> routeMatches = new ArrayList<>();
        for (Route start : filteredCandidateStartRoutes) {
            for (Route end : filteredCandidateEndRoutes) {
                // Ensure the arrival city of the start route matches the departure city of the
                // end route
                if (start.getArrivalCity().equalsIgnoreCase(end.getDepartureCity())) {
                    routeMatches.add(new Route[] { start, end });
                }
            }
        }

        for (Route[] match : routeMatches) {
            List<DayOfWeek> possibleStartDays = criteria.getDayOfWeek() == null ? match[0].getDaysOfOperation()
                    : List.of(criteria.getDayOfWeek());
            for (DayOfWeek startDay : possibleStartDays) {

                List<Layover> validLayovers = LayoverUtils.getValidLayovers(match[0], match[1], startDay);
                for (Layover layover : validLayovers) {
                    oneStopConnections.add(new Connection(List.of(match[0], match[1]), new Layover[] { layover }));
                }
            }

        }

        return oneStopConnections;
    }

    private List<Connection> searchTwoStops(SearchCriteria criteria) {

        List<Connection> twoStopConnections = new ArrayList<>();
        List<Route> candidateStartRoutes = RouteRepository.getInstance()
                .getRoutesByDepartureCity(criteria.getDepartureCity());
        List<Route> candidateEndRoutes = RouteRepository.getInstance()
                .getRoutesByArrivalCity(criteria.getArrivalCity());

        List<Route> filteredCandidateStartRoutes = filterRoutes(candidateStartRoutes, new SearchCriteria(
                criteria.getDepartureCity(),
                null,
                criteria.getDepartureTime(),
                null,
                criteria.getTrainType(),
                criteria.getMaxFirstClassPrice(),
                criteria.getMaxSecondClassPrice(),
                criteria.getDayOfWeek()));

        List<Route> filteredCandidateEndRoutes = filterRoutes(candidateEndRoutes, new SearchCriteria(
                null,
                criteria.getArrivalCity(),
                null,
                criteria.getArrivalTime(), // maybe we ignore arrival time for indirects
                criteria.getTrainType(),
                criteria.getMaxFirstClassPrice(),
                criteria.getMaxSecondClassPrice(),
                null));

        for (Route startRoute : filteredCandidateStartRoutes) {
            for (Route endRoute : filteredCandidateEndRoutes) {
                List<Route> middleRoutes = RouteRepository.getInstance()
                        .getRoutesByDepartureCity(startRoute.getArrivalCity());
                List<Route> filteredMiddleRoutes = filterRoutes(middleRoutes, new SearchCriteria(
                        null,
                        null,
                        null,
                        null,
                        criteria.getTrainType(),
                        criteria.getMaxFirstClassPrice(),
                        criteria.getMaxSecondClassPrice(),
                        null));
                List<DayOfWeek> possibleStartDays = criteria.getDayOfWeek() == null ? startRoute.getDaysOfOperation()
                        : List.of(criteria.getDayOfWeek());

                for (Route middleRoute : filteredMiddleRoutes) {
                    for (DayOfWeek startDay : possibleStartDays) {

                        List<Layover> firstLegLayovers = LayoverUtils.getValidLayovers(startRoute, middleRoute,
                                startDay);
                        for (Layover firstLegLayover : firstLegLayovers) {
                            List<Layover> secondLegLayovers = LayoverUtils.getValidLayovers(middleRoute, endRoute,
                                    firstLegLayover.getEndDepDay());
                            for (Layover secondLegLayover : secondLegLayovers) {
                                twoStopConnections.add(new Connection(
                                        List.of(startRoute, middleRoute, endRoute),
                                        new Layover[] { firstLegLayover, secondLegLayover }));
                            }
                        }

                    }

                }
            }
        }
        return twoStopConnections;
    }

    // filtering the routes based on the criteria provided by the user
    private List<Route> filterRoutes(List<Route> routes, SearchCriteria criteria) {
        return routes.stream()
                .filter(route -> SearchCriteriaUtils.matchesDepartureCity(route, criteria))
                .filter(route -> SearchCriteriaUtils.matchesArrivalCity(route, criteria))
                .filter(route -> SearchCriteriaUtils.matchesDepartureTime(route, criteria))
                .filter(route -> SearchCriteriaUtils.matchesArrivalTime(route, criteria))
                .filter(route -> SearchCriteriaUtils.matchesTrainType(route, criteria))
                .filter(route -> SearchCriteriaUtils.matchesDayOfOperation(route, criteria))
                .filter(route -> SearchCriteriaUtils.matchesMaxPrice(route, criteria))
                .collect(Collectors.toList());
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
        List<Route> allRoutes = RouteRepository.getInstance().getRoutes();

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
        List<Route> allRoutes = RouteRepository.getInstance().getRoutes();
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
        List<Route> allRoutes = RouteRepository.getInstance().getRoutes();

        return allRoutes.stream()
                .map(Route::getTrainType)
                .filter(trainType -> trainType != null)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
