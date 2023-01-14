package pw.react.backend.services;

import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.models.CarImage;

import java.util.UUID;

public interface ImageService {
    CarImage storeImage(UUID carId, MultipartFile file);
    CarImage getCarImage(UUID carId);
    void deleteCarImage(UUID carId);
}