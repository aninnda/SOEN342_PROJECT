package soen342.project.data;

import org.springframework.data.jpa.repository.JpaRepository;

import soen342.project.model.Traveler;

public interface TravelerRepository extends JpaRepository<Traveler, String> {

    Traveler findByIdIgnoreCase(String id);
    
}
