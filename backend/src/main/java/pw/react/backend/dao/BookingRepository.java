package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.Booking;

import java.util.UUID;

public interface BookingRepository  extends JpaRepository<Booking, UUID> {

}
