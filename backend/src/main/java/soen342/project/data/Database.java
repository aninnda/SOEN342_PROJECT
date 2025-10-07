package soen342.project.data;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.DayOfWeek;
import java.util.List;

import soen342.project.model.Route;
import soen342.project.util.DateTimeUtils;

import java.util.ArrayList;

public class Database {

    // TODO use an actual database
    private static final String ROUTES_CSV_FILE = "src/main/resources/static/eu_rail_network.csv";

    private List<Route> routes;

    private static Database instance;

    private Database() {
        // private constructor to prevent instantiation from outside as it's a singleton
    }

    public static synchronized Database getInstance() {
        if (instance == null) {
            instance = new Database();
            instance.readRoutesFromCSV(ROUTES_CSV_FILE);
        }
        return instance;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    // written with help from Copilot (as a database will likely be used later on)
    private void readRoutesFromCSV(String filePath) {
        routes = new ArrayList<>();
        BufferedReader br = null;

        try {
            // First try to load as a resource from classpath
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("static/eu_rail_network.csv");
            if (inputStream != null) {
                br = new BufferedReader(new InputStreamReader(inputStream));
            } else {
                // Fallback to file system path
                br = new BufferedReader(new FileReader(filePath));
            }
            
            if (br != null) {
                String line;
                boolean isFirstLine = true;

                while ((line = br.readLine()) != null) {
                    // Skip the header row
                    if (isFirstLine) {
                        isFirstLine = false;
                        continue;
                    }

                    // Parse CSV line handling quoted values that may contain commas
                    String[] values = parseCSVLine(line);

                    String routeId = values[0];
                    String departureCity = values[1];
                    String arrivalCity = values[2];
                    String departureTime = values[3];
                    String arrivalTime = values[4];
                    String trainType = values[5];
                    List<DayOfWeek> daysOfOperation = DateTimeUtils.stringToDays(values[6]);
                    int firstClassRate = Integer.parseInt(values[7]);
                    int secondClassRate = Integer.parseInt(values[8]);

                    Route route = new Route(routeId, departureCity, arrivalCity, departureTime, arrivalTime,
                            trainType, daysOfOperation, firstClassRate, secondClassRate);
                    routes.add(route);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            routes = new ArrayList<>(); // Initialize empty list if file reading fails
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    System.err.println("Error closing file: " + e.getMessage());
                }
            }
        }
    }

    // written with help from Copilot (as a database will likely be used later on)
    private String[] parseCSVLine(String line) {
        ArrayList<String> values = new ArrayList<>();
        boolean inQuotes = false;
        StringBuilder currentValue = new StringBuilder();

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);

            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                values.add(currentValue.toString());
                currentValue = new StringBuilder();
            } else {
                currentValue.append(c);
            }
        }

        // Add the last value
        values.add(currentValue.toString());

        return values.toArray(new String[0]);
    }

}
