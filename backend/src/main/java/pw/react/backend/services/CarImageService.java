package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.dao.CarImageRepository;
import pw.react.backend.exceptions.InvalidFileException;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.CarImage;

import java.io.IOException;
import java.util.UUID;

class CarImageService implements ImageService {

    private final Logger logger = LoggerFactory.getLogger(CarImageService.class);

    private final CarImageRepository repository;

    public CarImageService(CarImageRepository repository) {
        this.repository = repository;
    }


    @Override
    public CarImage storeImage(UUID carId, MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new InvalidFileException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            CarImage newCarImage = new CarImage(fileName, file.getContentType(), carId, file.getBytes());
            repository.findByCarId(carId).ifPresent(carImage -> newCarImage.setId(carImage.getId()));
            return repository.save(newCarImage);
        } catch (IOException ex) {
            throw new InvalidFileException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public CarImage getCarImage(UUID carId) {
        return repository.findByCarId(carId)
                .orElseThrow(() -> new ResourceNotFoundException("File not found with carId " + carId));
    }

    @Override
    public void deleteCarImage(UUID carId) {
        repository.deleteByCarId(carId);
        logger.info("Image for the car with id {} deleted.", carId);
    }
}
