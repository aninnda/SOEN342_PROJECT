package soen342.project.util;

import java.time.LocalTime;

import soen342.project.model.Route;
import soen342.project.model.Requests.SearchCriteria;

public class SearchCriteriaUtils {

    public static boolean matchesDepartureCity(Route route, SearchCriteria criteria) {
        if (criteria.getDepartureCity() == null || criteria.getDepartureCity().trim().isEmpty()) {
            return true;
        }
        return route.getDepartureCity() != null &&
                route.getDepartureCity().toLowerCase().contains(criteria.getDepartureCity().toLowerCase().trim());
    }

    public static boolean matchesArrivalCity(Route route, SearchCriteria criteria) {
        if (criteria.getArrivalCity() == null || criteria.getArrivalCity().trim().isEmpty()) {
            return true;
        }
        return route.getArrivalCity() != null &&
                route.getArrivalCity().toLowerCase().contains(criteria.getArrivalCity().toLowerCase().trim());
    }

    public static boolean matchesDepartureTime(Route route, SearchCriteria criteria) {
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

    public static boolean matchesArrivalTime(Route route, SearchCriteria criteria) {
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

    public static boolean matchesTrainType(Route route, SearchCriteria criteria) {
        if (criteria.getTrainType() == null || criteria.getTrainType().trim().isEmpty()) {
            return true;
        }
        return route.getTrainType() != null &&
                route.getTrainType().toLowerCase().contains(criteria.getTrainType().toLowerCase().trim());
    }

    public static boolean matchesDayOfOperation(Route route, SearchCriteria criteria) {
        if (criteria.getDayOfWeek() == null) {
            return true;
        }
        return route.getDaysOfOperation() != null &&
                route.getDaysOfOperation().contains(criteria.getDayOfWeek());
    }

    public static boolean matchesMaxPrice(Route route, SearchCriteria criteria) {
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

}
