package soen342.project.model.Responses;

import java.util.List;

import soen342.project.model.Connection;

public class SearchResponseModel {

    private List<Connection> connections;

    private boolean containsIndirectConnections;

    public SearchResponseModel(List<Connection> connections, boolean containsIndirectConnections) {
        this.connections = connections;
        this.containsIndirectConnections = containsIndirectConnections;
    }

    public List<Connection> getConnections() {
        return connections;
    }

    public boolean isContainsIndirectConnections() {
        return containsIndirectConnections;
    }

}
