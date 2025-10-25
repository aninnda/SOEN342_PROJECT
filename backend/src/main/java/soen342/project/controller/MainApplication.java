package soen342.project.controller;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import soen342.project.data.RouteRepository;
import soen342.project.model.Requests.SearchCriteria;
import soen342.project.model.Responses.SearchResponseModel;
import soen342.project.service.SearchService;

@SpringBootApplication
@ComponentScan(basePackages = "soen342.project")
@EntityScan(basePackages = "soen342.project.model")
@EnableJpaRepositories(basePackages = "soen342.project.data")
@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5176", "http://127.0.0.1:5176" })
public class MainApplication {

	SearchService searchService = new SearchService();

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}
// here we need to implement the exact date at which the  user wants to travel at some point  
	@GetMapping(value = "/search", produces = "application/json")
	public SearchResponseModel getConnections(
			@RequestParam(value = "departureCity", required = false) String departureCity,
			@RequestParam(value = "arrivalCity", required = false) String arrivalCity,
			@RequestParam(value = "departureTime", required = false) String departureTime,
			@RequestParam(value = "arrivalTime", required = false) String arrivalTime,
			@RequestParam(value = "trainType", required = false) String trainType,
			@RequestParam(value = "maxFirstClassPrice", required = false) String maxFirstClassPrice,
			@RequestParam(value = "maxSecondClassPrice", required = false) String maxSecondClassPrice,
			@RequestParam(value = "dayOfWeek", required = false) String dayOfWeek) {

		SearchCriteria criteria = new SearchCriteria(
				departureCity,
				arrivalCity,
				departureTime,
				arrivalTime,
				trainType,
				maxFirstClassPrice,
				maxSecondClassPrice,
				dayOfWeek);

		return searchService.search(criteria);
	}
// suggestions for cities, departure cities, arrival cities, train types to make it more user friendly
	@GetMapping(value = "/suggestions/cities", produces = "application/json")
	public List<String> suggestCities(@RequestParam(value = "q") String query) {
		return searchService.getAllCities().stream()
				.filter(city -> city.toLowerCase().startsWith(query.toLowerCase().trim()))
				.limit(10)
				.collect(java.util.stream.Collectors.toList());
	}

	@GetMapping(value = "/suggestions/departure-cities", produces = "application/json")
	public List<String> suggestDepartureCities(@RequestParam(value = "q") String query) {
		return searchService.suggestDepartureCities(query);
	}

	@GetMapping(value = "/suggestions/arrival-cities", produces = "application/json")
	public List<String> suggestArrivalCities(@RequestParam(value = "q") String query) {
		return searchService.suggestArrivalCities(query);
	}

	@GetMapping(value = "/suggestions/train-types", produces = "application/json")
	public List<String> suggestTrainTypes() {
		return searchService.getAllTrainTypes();
	}

	@GetMapping(value = "/cities", produces = "application/json")
	public List<String> getAllCities() {
		return searchService.getAllCities();
	}

	@GetMapping("/debug/routes-count")
	public String getRoutesCount() {
		return "Loaded routes: " + RouteRepository.getInstance().getRoutes().size();
	}

}
