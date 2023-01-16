package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Booking;
import pw.react.backend.services.BookingService;
import pw.react.backend.web.BookingDto;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;
import static pw.react.backend.controller.HeadersLogger.logHeaders;
import static pw.react.backend.web.BookingDto.convertToBooking;
import static pw.react.backend.web.BookingDto.valueFrom;

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

    // Returns a list of all booking records
    @GetMapping(path = "")
    public ResponseEntity<Collection<BookingDto>> getAllBookings(@RequestHeader HttpHeaders headers) {
        logHeaders(headers, logger);
        return ResponseEntity.ok(bookingRepository.findAll().stream().map(BookingDto::valueFrom).collect(toList()));
    }

    @PostMapping(path = "")
    public ResponseEntity<Collection<BookingDto>> createBookings(@RequestHeader HttpHeaders headers,
                                                                  @Valid @RequestBody List<BookingDto> bookingDtos) {
        logHeaders(headers, logger);
        List<Booking> createdBookings = bookingDtos.stream().map(BookingDto::convertToBooking).toList();
        List<BookingDto> result = bookingRepository.saveAll(createdBookings)
                .stream()
                .map(BookingDto::valueFrom)
                .toList();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // Provides info about booking as JSON, if it doesn't exist return 404
    @GetMapping(path = "/{id}")
    public ResponseEntity<BookingDto> getBooking(@RequestHeader HttpHeaders headers, @PathVariable UUID id) {
        logHeaders(headers, logger);
        BookingDto result = bookingRepository.findById(id)
                .map(BookingDto::valueFrom)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Booking with %s does not exist", id)));
        // will return 404 in case booking not found
        return ResponseEntity.ok(result);
    }

    // Creates a new booking from supplied data (JSON)
    @PutMapping(path = "")
    public ResponseEntity<BookingDto> createBooking(@RequestHeader HttpHeaders headers,
                                                    @Valid @RequestBody BookingDto bookingDto) {
        logHeaders(headers, logger);
        Booking createdBooking = convertToBooking(bookingDto);
        bookingRepository.save(createdBooking);
        BookingDto result = valueFrom(createdBooking);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    // Update booking using supplied JSON
    @PostMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateBooking(@RequestHeader HttpHeaders headers, @PathVariable UUID id,
                              @Valid @RequestBody BookingDto updatedBooking) {
        logHeaders(headers, logger);
        bookingService.updateBooking(id, BookingDto.convertToBooking(updatedBooking));
    }

    // Removes booking from repository
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> removeBooking(@RequestHeader HttpHeaders headers, @PathVariable UUID id) {
        logHeaders(headers, logger);
        boolean deleted = bookingService.deleteBooking(id);
        if (!deleted) {
            return ResponseEntity.badRequest().body(String.format("Booking with id %s does not exists.", id));
        }
        return ResponseEntity.ok(String.format("Booking with id %s deleted.", id));
    }

}
