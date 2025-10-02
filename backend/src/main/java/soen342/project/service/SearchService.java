package soen342.project.service;

import java.util.List;

import soen342.project.data.Database;
import soen342.project.models.Connection;

public class SearchService {
    public List<Connection> search() {
        // TODO handle search logic, right now it's just returning all results.
        return Database.getInstance().getConnections();
    }

}
