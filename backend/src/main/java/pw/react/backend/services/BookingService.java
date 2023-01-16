package pw.react.backend.services;

import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Booking;

import java.util.UUID;

public interface BookingService {
    Booking updateBooking(UUID id, Booking updatedBooking) throws ResourceNotFoundException;
    boolean deleteBooking(UUID id);
}
