package soen342.project.util;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import soen342.project.model.Layover;
import soen342.project.model.Route;

public class LayoverUtils {

    public static final double MAX_LAYOVER_NIGHT_HOURS = 1.0; // 7 pm to 5 am
    public static final double MAX_LAYOVER_DAY_HOURS = 3.0; // 5 am to 7 pm

    public static boolean hasValidLayover(Route startRoute, Route endRoute, DayOfWeek startDayOfWeek,
            DayOfWeek endDayOfWeek) {

        if (startRoute.getArrivalTime() != null && endRoute.getDepartureTime() != null) {
            String arrivalTime = startRoute.getArrivalTime();

            int arrivalHour = Integer.parseInt(arrivalTime.substring(0, 2));

            double differenceInHours = DateTimeUtils.calculateDateTimeDifferenceInHours(startDayOfWeek,
                    startRoute.getArrivalTime(), endDayOfWeek, endRoute.getDepartureTime());

            // if the layover starts between 7 pm to 5 am (exclusive)
            if (arrivalHour < 5 || arrivalHour >= 19) {
                return differenceInHours <= 2;
            }
            // if the layover starts between 5 am to 7 pm (inclusive)
            else {
                return differenceInHours <= 5;
            }

        }

        return false;
    }

    public static boolean matchesPolicy(Layover layover) {

        int arrivalHour = Integer.parseInt(layover.getStartRoute().getArrivalTime().substring(0, 2));

        // outside business hours
        if (arrivalHour < 5 || arrivalHour >= 19) {
            return layover.getDuration() <= MAX_LAYOVER_NIGHT_HOURS;
        } else {
            return layover.getDuration() <= MAX_LAYOVER_DAY_HOURS;
        }

    }

    public static List<Layover> getValidLayovers(Route startRoute, Route endRoute, DayOfWeek startDepDay) {

        List<Layover> validLayovers = new ArrayList<>();

        for (DayOfWeek endDay : endRoute.getDaysOfOperation()) {
            double tempDuration = DateTimeUtils.calculateDateTimeDifferenceInHours(startDepDay,
                    startRoute.getArrivalTime(), endDay, endRoute.getDepartureTime());
            Layover tempLayover = new Layover(startRoute, startDepDay,
                    DateTimeUtils.getAdjustedDayOfWeek(startDepDay, startRoute.getArrivalTime()), endRoute, endDay,
                    DateTimeUtils.getAdjustedDayOfWeek(endDay, endRoute.getArrivalTime()),
                    tempDuration);
            if (matchesPolicy(tempLayover)) {
                validLayovers.add(tempLayover);
            }

        }
        return validLayovers;
    }
}
