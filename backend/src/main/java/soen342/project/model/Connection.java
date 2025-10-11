package soen342.project.model;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import soen342.project.util.DateTimeUtils;

public class Connection {

    private List<Route> routes;

    private double totalMovingDuration; // in hours
    private double connectionChangeDuration; // in hours
    private double totalTripDuration; // in hours
    private int totalFirstClassTicketRate;
    private int totalSecondClassTicketRate;
    private int numberOfTransfers;

    /**
     * Layovers are optimized based on route days of operation and irrespective of
     * the searched days of operation.
     */
    private Layover[] layovers;

    public Connection(List<Route> routes) {
        this.routes = routes;
        this.totalMovingDuration = calculateTotalMovingDuration(routes);
        this.connectionChangeDuration = calculateConnectionChangeDuration(routes);
        this.totalTripDuration = this.totalMovingDuration + this.connectionChangeDuration;
        this.totalFirstClassTicketRate = routes.stream().mapToInt(Route::getFirstClassTicketRate).sum();
        this.totalSecondClassTicketRate = routes.stream().mapToInt(Route::getSecondClassTicketRate).sum();
        this.numberOfTransfers = routes.size() - 1;
        this.layovers = findShortestLayoverCombination(routes);
    }

    private double calculateTotalMovingDuration(List<Route> routes) {
        return routes.stream().mapToDouble(Route::getTripDuration).sum();
    }

    /**
     * This function returns the total duration spent during connection changes
     * between routes.
     * It finds the shortest time difference based on the days and times of arrival
     * and departure.
     */
    private double calculateConnectionChangeDuration(List<Route> routes) {
        Layover[] bestLayovers = findShortestLayoverCombination(routes);
        if (bestLayovers.length == 0) {
            return 0;
        }
        double totalLayoverDuration = 0;
        for (Layover layover : bestLayovers) {
            totalLayoverDuration += layover.getLayoverDuration();
        }
        return totalLayoverDuration;
    }

    private Layover[] findShortestLayoverCombination(List<Route> routes) {

        if (routes.size() < 2) {
            return new Layover[0]; // No layovers for direct routes
        }

        Route firstRoute = routes.get(0);
        Route secondRoute = routes.get(1);
        Route thirdRoute = routes.size() == 3 ? routes.get(2) : null;

        List<Layover[]> layoverCombinations = new ArrayList<>();

        for (DayOfWeek firstRouteStartDay : firstRoute.getDaysOfOperation()) {

            for (DayOfWeek secondRouteStartDay : secondRoute.getDaysOfOperation()) {

                DayOfWeek firstRouteEndDay = firstRouteStartDay.plus(
                        firstRoute.getArrivalTime().contains("(+1d)") ? 1 : 0);

                double changeDuration = DateTimeUtils.calculateDateTimeDifferenceInHours(
                        firstRouteStartDay,
                        firstRoute.getArrivalTime(),
                        secondRouteStartDay,
                        secondRoute.getDepartureTime());

                Layover layover = new Layover(firstRoute, secondRoute, firstRouteStartDay, firstRouteEndDay,
                        secondRouteStartDay,
                        changeDuration);

                if (thirdRoute != null) {
                    for (DayOfWeek thirdRouteDay : thirdRoute.getDaysOfOperation()) {

                        DayOfWeek secondRouteEndDay = secondRouteStartDay.plus(
                                secondRoute.getArrivalTime().contains("(+1d)") ? 1 : 0);

                        double secondChangeDuration = DateTimeUtils.calculateDateTimeDifferenceInHours(
                                secondRouteStartDay,
                                secondRoute.getArrivalTime(),
                                thirdRouteDay,
                                thirdRoute.getDepartureTime());
                        Layover secondLayover = new Layover(secondRoute, thirdRoute, secondRouteStartDay,
                                secondRouteEndDay, thirdRouteDay,
                                secondChangeDuration);

                        layoverCombinations.add(new Layover[] { layover, secondLayover });
                    }
                } else {
                    layoverCombinations.add(new Layover[] { layover });
                }

            }

        }

        double shortestLayoverDuration = Double.MAX_VALUE;
        Layover[] bestCombination = null;
        for (Layover[] currentLayovers : layoverCombinations) {
            double totalChangeDuration = 0;
            for (Layover layover : currentLayovers) {
                totalChangeDuration += layover.getLayoverDuration();
            }
            if (totalChangeDuration < shortestLayoverDuration) {
                shortestLayoverDuration = totalChangeDuration;
                bestCombination = currentLayovers;
            }
        }

        return bestCombination;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    public double getTotalMovingDuration() {
        return totalMovingDuration;
    }

    public void setTotalMovingDuration(double totalMovingDuration) {
        this.totalMovingDuration = totalMovingDuration;
    }

    public double getConnectionChangeDuration() {
        return connectionChangeDuration;
    }

    public void setConnectionChangeDuration(double connectionChangeDuration) {
        this.connectionChangeDuration = connectionChangeDuration;
    }

    public double getTotalTripDuration() {
        return totalTripDuration;
    }

    public void setTotalTripDuration(double totalTripDuration) {
        this.totalTripDuration = totalTripDuration;
    }

    public int getTotalFirstClassTicketRate() {
        return totalFirstClassTicketRate;
    }

    public void setTotalFirstClassTicketRate(int totalFirstClassTicketRate) {
        this.totalFirstClassTicketRate = totalFirstClassTicketRate;
    }

    public int getTotalSecondClassTicketRate() {
        return totalSecondClassTicketRate;
    }

    public void setTotalSecondClassTicketRate(int totalSecondClassTicketRate) {
        this.totalSecondClassTicketRate = totalSecondClassTicketRate;
    }

    public int getNumberOfTransfers() {
        return numberOfTransfers;
    }

    public void setNumberOfTransfers(int numberOfTransfers) {
        this.numberOfTransfers = numberOfTransfers;
    }

    public Layover[] getLayovers() {
        return layovers;
    }

    public void setLayovers(Layover[] layovers) {
        this.layovers = layovers;
    };
};
