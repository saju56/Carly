package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import pw.react.backend.models.CarImage;

import java.util.Optional;
import java.util.UUID;

@Transactional
public interface CarImageRepository extends JpaRepository<CarImage, String> {
    Optional<CarImage> findByCarId(UUID carId);
    void deleteByCarId(UUID carId);
}

