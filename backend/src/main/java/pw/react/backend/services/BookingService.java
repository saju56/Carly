package pw.react.backend.services;

import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Booking;
import pw.react.backend.web.BookingDto;

import java.util.List;
import java.util.UUID;

public interface BookingService {

    Booking updateBooking(UUID id, Booking updatedBooking) throws ResourceNotFoundException;
    boolean deleteBooking(UUID id);
    List<BookingDto> getAllBookings();
    List<BookingDto> saveManyBookings(List<Booking> bookings);
    BookingDto getBookingById(UUID id);
    BookingDto saveBooking(Booking booking);
}
