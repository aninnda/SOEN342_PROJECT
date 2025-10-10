package soen342.project.util;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class DateTimeUtils {

    // Generated with help from Copilot
    public static String daysToString(List<DayOfWeek> days) {
        if (days.size() == 7) {
            return "Daily";
        }

        // Check for consecutive days to form a range
        List<String> dayAbbreviations = new ArrayList<>();
        for (DayOfWeek day : days) {
            switch (day) {
                case MONDAY:
                    dayAbbreviations.add("Mon");
                    break;
                case TUESDAY:
                    dayAbbreviations.add("Tue");
                    break;
                case WEDNESDAY:
                    dayAbbreviations.add("Wed");
                    break;
                case THURSDAY:
                    dayAbbreviations.add("Thu");
                    break;
                case FRIDAY:
                    dayAbbreviations.add("Fri");
                    break;
                case SATURDAY:
                    dayAbbreviations.add("Sat");
                    break;
                case SUNDAY:
                    dayAbbreviations.add("Sun");
                    break;
            }
        }

        // Check if days are consecutive
        boolean isConsecutive = true;
        for (int i = 1; i < days.size(); i++) {
            if (days.get(i).ordinal() != days.get(i - 1).ordinal() + 1) {
                isConsecutive = false;
                break;
            }
        }

        if (isConsecutive && days.size() > 1) {
            return dayAbbreviations.get(0) + "-" + dayAbbreviations.get(dayAbbreviations.size() - 1);
        } else {
            return String.join(", ", dayAbbreviations);
        }
    }

    // Generated with help from Copilot
    public static List<DayOfWeek> stringToDays(String days) {
        List<DayOfWeek> daysOfOperation = new ArrayList<>();

        if (days.equalsIgnoreCase("daily")) {
            for (DayOfWeek day : DayOfWeek.values()) {
                daysOfOperation.add(day);
            }
            return daysOfOperation;
        }

        // days are a range
        if (days.contains("-")) {
            String[] range = days.split("-");
            if (range.length == 2) { // it should be
                DayOfWeek startDay = parseDay(range[0].trim());
                DayOfWeek endDay = parseDay(range[1].trim());

                if (startDay != null && endDay != null) {

                    /**
                     * Ordinals are the associated 0-based values from the enum declaration.
                     * We use them to iteratively add days into the range. (i.e. to know which day
                     * comes next in a range)
                     */

                    int startOrdinal = startDay.ordinal();
                    int endOrdinal = endDay.ordinal();

                    for (int i = startOrdinal; i <= endOrdinal; i++) {
                        daysOfOperation.add(DayOfWeek.of((i % 7) + 1));
                    }
                }
            }
        } else { // days are an enumeration
            String[] dayTokens = days.split(",");
            for (String token : dayTokens) {
                DayOfWeek day = parseDay(token.trim());
                if (day != null) {
                    daysOfOperation.add(day);
                }
            }
        }

        return daysOfOperation;
    }

    // Generated with help from Copilot
    public static DayOfWeek parseDay(String day) {
        switch (day.toLowerCase()) {
            case "mon":
                return DayOfWeek.MONDAY;
            case "tue":
                return DayOfWeek.TUESDAY;
            case "wed":
                return DayOfWeek.WEDNESDAY;
            case "thu":
                return DayOfWeek.THURSDAY;
            case "fri":
                return DayOfWeek.FRIDAY;
            case "sat":
                return DayOfWeek.SATURDAY;
            case "sun":
                return DayOfWeek.SUNDAY;
            default:
                return null; // Handle unexpected values if necessary
        }
    }

    /**
     * Calculates the difference in hours between two date-times.
     * The difference works chronologically, from start datetime to end datetime.
     * 
     * @param startDay
     * @param startTime
     * @param endDay
     * @param endTime
     * @param doesFirstRouteEndOnNextDay
     * @return
     */
    public static double calculateDateTimeDifferenceInHours(DayOfWeek startDay, String startTime, DayOfWeek endDay,
            String endTime) {
        int dayDifference = endDay.ordinal() - (startDay.ordinal() + (startTime.contains("(+1d)") ? 1 : 0));
        if (dayDifference < 0) {
            dayDifference += 7; // wrap around the week
        }

        String startTimeCleaned = startTime.replace(" (+1d)", "").trim();
        String endTimeCleaned = endTime.replace(" (+1d)", "").trim(); // not necessary because departure times don't
                                                                      // have +1, but for consistency

        boolean isStartTimeAfterEndTime = LocalTime.parse(startTimeCleaned).isAfter(LocalTime.parse(endTimeCleaned));

        String[] startParts = startTime.replace("(+1d)", "").split(":");
        String[] endParts = endTime.split(":");

        int startHour = Integer.parseInt(startParts[0]);
        int startMinute = Integer.parseInt(startParts[1]);
        int endHour = Integer.parseInt(endParts[0]);
        int endMinute = Integer.parseInt(endParts[1]);

        int totalStartMinutes = startHour * 60 + startMinute;

        // If the start time is after the end time on the same day, then the difference
        // wraps to the next week.
        int adjustedDayDifference = dayDifference == 0 && isStartTimeAfterEndTime ? 7 : dayDifference;

        int totalEndMinutes = endHour * 60 + endMinute + (adjustedDayDifference * 24 * 60);

        int differenceInMinutes = totalEndMinutes - totalStartMinutes;
        return differenceInMinutes / 60.0;
    }

}
