package soen342.project.model;

import java.time.DayOfWeek;

public class Layover {

    private Route startRoute;
    private Route endRoute;
    private DayOfWeek startDepDay;
    private DayOfWeek startArrDay;
    private DayOfWeek endDepDay;
    private DayOfWeek endArrDay;
    private double duration; // in hours

    public Layover(Route startRoute, DayOfWeek startDepDay, DayOfWeek startArrDay,
            Route endRoute, DayOfWeek endDepDay, DayOfWeek endArrDay, double duration) {
        this.startRoute = startRoute;
        this.startDepDay = startDepDay;
        this.startArrDay = startArrDay;
        this.endRoute = endRoute;
        this.endDepDay = endDepDay;
        this.endArrDay = endArrDay;
        this.duration = duration;
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

    public DayOfWeek getStartDepDay() {
        return startDepDay;
    }

    public void setStartDepDay(DayOfWeek startDepDay) {
        this.startDepDay = startDepDay;
    }

    public DayOfWeek getStartArrDay() {
        return startArrDay;
    }

    public void setStartArrDay(DayOfWeek startArrDay) {
        this.startArrDay = startArrDay;
    }

    public DayOfWeek getEndDepDay() {
        return endDepDay;
    }

    public void setEndDepDay(DayOfWeek endDepDay) {
        this.endDepDay = endDepDay;
    }

    public DayOfWeek getEndArrDay() {
        return endArrDay;
    }

    public void setEndArrDay(DayOfWeek endArrDay) {
        this.endArrDay = endArrDay;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

}
