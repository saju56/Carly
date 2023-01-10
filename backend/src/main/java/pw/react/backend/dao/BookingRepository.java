package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.Booking;

public interface BookingRepository  extends JpaRepository<Booking, Long> {

}
