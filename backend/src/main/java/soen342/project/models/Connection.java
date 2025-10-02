package soen342.project.models;

public class Connection {
    private String routeId;
    private String departureCity;
    private String arrivalCity;
    private String departureTime;
    private String arrivalTime;
    private String trainType;
    private String daysOfOperation;
    private int firstClassTicketRate;
    private int secondClassTicketRate;

    public Connection() {
    }

    public Connection(String routeId, String departureCity, String arrivalCity, String departureTime, String arrivalTime,
                      String trainType, String daysOfOperation, int firstClassTicketRate, int secondClassTicketRate) {
        this.routeId = routeId;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.trainType = trainType;
        this.daysOfOperation = daysOfOperation;
        this.firstClassTicketRate = firstClassTicketRate;
        this.secondClassTicketRate = secondClassTicketRate;
    }

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public void setArrivalCity(String arrivalCity) {
        this.arrivalCity = arrivalCity;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getTrainType() {
        return trainType;
    }

    public void setTrainType(String trainType) {
        this.trainType = trainType;
    }

    public String getDaysOfOperation() {
        return daysOfOperation;
    }

    public void setDaysOfOperation(String daysOfOperation) {
        this.daysOfOperation = daysOfOperation;
    }

    public int getFirstClassTicketRate() {
        return firstClassTicketRate;
    }

    public void setFirstClassTicketRate(int firstClassTicketRate) {
        this.firstClassTicketRate = firstClassTicketRate;
    }

    public int getSecondClassTicketRate() {
        return secondClassTicketRate;
    }

    public void setSecondClassTicketRate(int secondClassTicketRate) {
        this.secondClassTicketRate = secondClassTicketRate;
    }
}
