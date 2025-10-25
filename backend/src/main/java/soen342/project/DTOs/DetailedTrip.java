package soen342.project.DTOs;

import java.util.List;

import soen342.project.model.Trip;

public class DetailedTrip extends Trip {

    private List<RouteDetails> routes;

    public DetailedTrip(Trip trip, List<RouteDetails> routes) {
        super(trip);
        this.routes = routes;
    }

    public List<RouteDetails> getRoutes() {
        return routes;
    }

}
