package soen342.project.service;

import java.util.ArrayList;
import java.util.List;

import soen342.project.data.Database;
import soen342.project.model.Connection;
import soen342.project.model.Route;
import soen342.project.model.Requests.SearchCriteria;
import soen342.project.model.Responses.SearchResponseModel;

public class SearchService {
    public SearchResponseModel search(SearchCriteria criteria) {
        // TODO handle search logic, right now it's just returning all results.

        List<Connection> allConnections = new ArrayList<>();

        for (Route route : Database.getInstance().getRoutes()) {
            allConnections.add(new Connection(List.of(route)));
        }

        List<Connection> filteredConnections = allConnections; // TODO add filtering by search criteria
        boolean containsIndirectConnections = false;


        // If the first connection has more than 1 route, then there are indirect connections.
        // This works under the assumption that indirect connections are not returned if direct connections exist.
        if (filteredConnections.size() > 0) {
            containsIndirectConnections = filteredConnections.get(0).getRoutes().size() > 1;
        }

        return new SearchResponseModel(allConnections, containsIndirectConnections);
    }

}
