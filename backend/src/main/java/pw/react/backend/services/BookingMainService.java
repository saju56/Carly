package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Booking;

import java.util.UUID;

public class BookingMainService implements BookingService {
    private final Logger logger = LoggerFactory.getLogger(BookingMainService.class);

    private BookingRepository bookingRepository;

    BookingMainService() { /*Needed only for initializing spy in unit tests*/}

    BookingMainService(BookingRepository repository) {
        this.bookingRepository = repository;
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
}
