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
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.services.BookingService;
import pw.react.backend.web.BookingDto;

import java.util.Collection;

import static java.util.stream.Collectors.toList;
import static pw.react.backend.controller.HeadersLogger.logHeaders;

@RestController
@RequestMapping(path = BookingController.BOOKINGS_PATH)
public class BookingController {

    public static final String BOOKINGS_PATH = "/logic/api/bookings";

    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingController(BookingService bookingService, BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping(path = "")
    public ResponseEntity<Collection<BookingDto>> getAllBookings(@RequestHeader HttpHeaders headers) {
        logHeaders(headers, logger);
        return ResponseEntity.ok(bookingRepository.findAll().stream().map(BookingDto::valueFrom).collect(toList()));
    }
}
