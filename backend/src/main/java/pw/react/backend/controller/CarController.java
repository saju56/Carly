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
import pw.react.backend.services.CarService;
import pw.react.backend.web.CarDto;

import java.util.Collection;

import static java.util.stream.Collectors.toList;
import static pw.react.backend.controller.HeadersLogger.logHeaders;

@RestController
@RequestMapping(path = CarController.BOOKINGS_PATH)
public class CarController {

    public static final String CARS_PATH = "/logic/api/cars";

    private static final Logger log = LoggerFactory.getLogger(CarController.class);

    private final BookingService carService;
    private final BookingRepository carRepository;

    @Autowired
    public BookingController(BookingService bookingService, BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping(path = "")
    public ResponseEntity<Collection<BookingDTO>> getAllBookings(@RequestHeader HttpHeaders headers) {
        logHeaders(headers, logger);
        return ResponseEntity.ok(bookingRepository.findAll().stream().map(BookingDTO::valueFrom).collect(toList()));
    }
}
