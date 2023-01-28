package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Booking;
import pw.react.backend.web.BookingDto;

import java.util.List;
import java.util.UUID;

import static java.util.Objects.requireNonNull;
import static java.util.stream.Collectors.toList;

public class BookingMainService implements BookingService {

    private final Logger logger = LoggerFactory.getLogger(BookingMainService.class);

    private final BookingRepository bookingRepository;

    public BookingMainService(BookingRepository repository) {
        this.bookingRepository = requireNonNull(repository);
    }

    @Override
    public Booking updateBooking(UUID id, Booking updatedBooking) throws ResourceNotFoundException {
        if (bookingRepository.existsById(id)) {
            updatedBooking.setId(id);
            Booking result = bookingRepository.save(updatedBooking);
            logger.info("Booking with id {} updated.", id);
            return result;
        }
        throw new ResourceNotFoundException(String.format("Booking with id [%s] not found.", id));
    }

    @Override
    public boolean deleteBooking(UUID id) {
        boolean result = false;
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            logger.info("Booking with id {} deleted.", id);
            result = true;
        }
        return result;
    }

    @Override
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().
                stream()
                .map(BookingDto::valueFrom)
                .collect(toList());
    }

    @Override
    public List<BookingDto> saveManyBookings(List<Booking> bookings) {
        return bookingRepository.saveAll(bookings)
                .stream()
                .map(BookingDto::valueFrom)
                .toList();
    }

    @Override
    public BookingDto getBookingById(UUID id) throws ResourceNotFoundException {
        return bookingRepository.findById(id)
                .map(BookingDto::valueFrom)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Booking with %s does not exist", id)));
    }

    @Override
    public BookingDto saveBooking(Booking booking) {
        return BookingDto.valueFrom(bookingRepository.save(booking));
    }
}
