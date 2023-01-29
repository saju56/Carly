package pw.react.backend.web;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pw.react.backend.models.Booking;
import pw.react.backend.utils.JsonDateDeserializer;
import pw.react.backend.utils.JsonDateSerializer;

import java.time.LocalDateTime;
import java.util.UUID;

public record BookingDto(UUID id, UUID userId, UUID carId,
                         @JsonDeserialize(using = JsonDateDeserializer.class)
                         @JsonSerialize(using = JsonDateSerializer.class)
                         LocalDateTime startDate,
                         @JsonDeserialize(using = JsonDateDeserializer.class)
                         @JsonSerialize(using = JsonDateSerializer.class)
                         LocalDateTime endDate, String name, String lastname) {

    public static final BookingDto EMPTY = new BookingDto(null, null, null, null, null, null, null);

    public static BookingDto valueFrom(Booking booking) {
        return new BookingDto(booking.getId(), booking.getUserId(), booking.getCarId(),
                booking.getStartDate(), booking.getEndDate(), booking.getName(), booking.getLastname());
    }
    public static Booking convertToBooking(BookingDto dto) {
        Booking booking = new Booking();
        booking.setId(dto.id());
        booking.setCarId(dto.carId());
        booking.setUserId(dto.userId());
        booking.setStartDate(dto.startDate());
        booking.setEndDate(dto.endDate());
        booking.setName(dto.name());
        booking.setLastname(dto.lastname());
        return booking;
    }
}
