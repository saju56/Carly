package pw.react.backend.dao;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pw.react.backend.models.Car;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface CarRepository extends JpaRepository<Car, UUID> {

    @Query("SELECT c FROM Car c WHERE c.id NOT IN (" +
            "SELECT b.carId FROM Booking b WHERE b.startDate<?2 AND b.endDate>?1)" +
            "AND c.bodyType LIKE ?3 AND c.city LIKE ?4 AND c.model LIKE ?5")
    List<Car> findAvailableCarsForIntervalAndBodyTypeSortBy(@Param(value = "request") LocalDateTime startDate,
                                                            @Param(value = "end") LocalDateTime endDate,
                                                            @Param(value = "bodyType") String bodyType,
                                                            @Param(value = "location") String location,
                                                            @Param(value = "model") String model,
                                                            Sort sort);
}
