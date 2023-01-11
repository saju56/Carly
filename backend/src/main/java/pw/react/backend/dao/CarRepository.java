package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.Car;

import java.util.UUID;

public interface CarRepository extends JpaRepository<Car, UUID> {
}
