package pw.react.backend.web;

import pw.react.backend.models.Booking;

public record BookingDTO(Long id) {

    // TODO: This is basic implementation and should be extended
    public static BookingDTO valueFrom(Booking booking) {
        return new BookingDTO(booking.getId());
    }
}
