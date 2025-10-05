package soen342.project.data;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import soen342.project.models.Connection;

public class Database {

    // TODO use an actual database
    private static final String CONNECTIONS_CSV_FILE = "src/main/resources/static/eu_rail_network.csv";

    private List<Connection> connections;

    private static Database instance;

    private Database() {
        // private constructor to prevent instantiation from outside as it's a singleton
    }

    public static synchronized Database getInstance() {
        if (instance == null) {
            instance = new Database();
            instance.readConnectionsFromCSV(CONNECTIONS_CSV_FILE);
        }
        return instance;
    }

    public List<Connection> getConnections() {
        return connections;
    }

    // written with help from Copilot (as a database will likely be used later on)
    private void readConnectionsFromCSV(String filePath) {
        connections = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
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

                String routeId = values[0].trim();
                String departureCity = values[1].trim();
                String arrivalCity = values[2].trim();
                String departureTime = values[3].trim();
                String arrivalTime = values[4].trim();
                String trainType = values[5].trim();
                String daysOfOperation = values[6].trim();
                int firstClassRate = Integer.parseInt(values[7].trim());
                int secondClassRate = Integer.parseInt(values[8].trim());

                Connection connection = new Connection(routeId, departureCity, arrivalCity,
                        departureTime, arrivalTime, trainType,
                        daysOfOperation, firstClassRate, secondClassRate);
                connections.add(connection);
            }

        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
            connections = new ArrayList<>(); // Initialize empty list if file reading fails
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
