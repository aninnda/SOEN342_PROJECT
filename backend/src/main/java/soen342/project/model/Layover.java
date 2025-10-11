package soen342.project.model;

import java.time.DayOfWeek;

public class Layover {

    private Route startRoute;
    private Route endRoute;
    private DayOfWeek firstRouteStartDay;
    private DayOfWeek firstRouteEndDay;
    private DayOfWeek secondRouteStartDay;
    private double layoverDuration; // in hours

    public Layover(Route startRoute, Route endRoute, DayOfWeek firstRouteStartDay, DayOfWeek firstRouteEndDay,
            DayOfWeek secondRouteStartDay, double layoverDuration) {
        this.startRoute = startRoute;
        this.endRoute = endRoute;
        this.firstRouteStartDay = firstRouteStartDay;
        this.firstRouteEndDay = firstRouteEndDay;
        this.secondRouteStartDay = secondRouteStartDay;
        this.layoverDuration = layoverDuration;
    }

    public Route getStartRoute() {
        return startRoute;
    }

    public void setStartRoute(Route startRoute) {
        this.startRoute = startRoute;
    }

    public Route getEndRoute() {
        return endRoute;
    }

    public void setEndRoute(Route endRoute) {
        this.endRoute = endRoute;
    }

    public DayOfWeek getFirstRouteStartDay() {
        return firstRouteStartDay;
    }

    public void setFirstRouteStartDay(DayOfWeek firstRouteStartDay) {
        this.firstRouteStartDay = firstRouteStartDay;
    }

    public DayOfWeek getFirstRouteEndDay() {
        return firstRouteEndDay;
    }

    public void setFirstRouteEndDay(DayOfWeek firstRouteEndDay) {
        this.firstRouteEndDay = firstRouteEndDay;
    }

    public DayOfWeek getSecondRouteStartDay() {
        return secondRouteStartDay;
    }

    public void setSecondRouteStartDay(DayOfWeek secondRouteStartDay) {
        this.secondRouteStartDay = secondRouteStartDay;
    }

    public double getLayoverDuration() {
        return layoverDuration;
    }

    public void setLayoverDuration(double layoverDuration) {
        this.layoverDuration = layoverDuration;
    }

}
