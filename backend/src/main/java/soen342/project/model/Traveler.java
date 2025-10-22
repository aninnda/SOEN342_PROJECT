package soen342.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "travelers")
public class Traveler {
    
    @Id
    private String identifier;
    
    private String name;
    private Integer age;
    
    public Traveler() {}
    
    public Traveler(String name, Integer age, String identifier) {
        this.name = name;
        this.age = age;
        this.identifier = identifier;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public String getIdentifier() {
        return identifier;
    }
    
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
