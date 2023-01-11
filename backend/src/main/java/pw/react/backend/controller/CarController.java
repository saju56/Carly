package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pw.react.backend.dao.CarRepository;
import pw.react.backend.dao.CompanyRepository;
import pw.react.backend.services.CarService;
import pw.react.backend.services.CompanyService;
import pw.react.backend.web.CarDto;

import java.util.Collection;

import static java.util.stream.Collectors.toList;
import static pw.react.backend.controller.HeadersLogger.logHeaders;

@RestController
@RequestMapping(path = CarController.CARS_PATH)
public class CarController {

    public static final String CARS_PATH = "/logic/api/cars";

    private static final Logger log = LoggerFactory.getLogger(CarController.class);
    private final CarService carService;
    private final CarRepository repository;

    public CarController(CarRepository carRepository, CarService carService) {
        this.repository = carRepository;
        this.carService = carService;
    }


}
