package pw.react.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pw.react.backend.dao.CarRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.CarImage;
import pw.react.backend.models.Car;
import pw.react.backend.models.CompanyLogo;
import pw.react.backend.services.CarService;
import pw.react.backend.services.ImageService;
import pw.react.backend.services.LogoService;
import pw.react.backend.web.CarDto;
import pw.react.backend.web.UploadFileResponse;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;
import static pw.react.backend.controller.HeadersLogger.logHeaders;

@RestController
@RequestMapping(path = CarController.CARS_PATH)
public class CarController {

    public static final String CARS_PATH = "/logic/api/cars";

    private static final Logger log = LoggerFactory.getLogger(CarController.class);
    private final CarService carService;
    private final CarRepository repository;

    private ImageService carImageService;

    public CarController(CarRepository carRepository, CarService carService) {
        this.repository = carRepository;
        this.carService = carService;
    }
    @Autowired
    public void setCarImageService(ImageService carImageService) {
        this.carImageService = carImageService;
    }

    @GetMapping(path = "/{carId}")
    public ResponseEntity<CarDto> getCar(@RequestHeader HttpHeaders headers, @PathVariable UUID carId) {
        logHeaders(headers, log);
        CarDto result = repository.findById(carId)
                .map(CarDto::valueFrom)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Car with %d does not exist", carId)));
        return ResponseEntity.ok(result);
    }

    @PostMapping(path = "")
    public ResponseEntity<Collection<CarDto>> createCar(@RequestHeader HttpHeaders headers,
                                                                  @Valid @RequestBody List<CarDto> cars) {
        logHeaders(headers, log);
        List<Car> createdCar = cars.stream().map(CarDto::convertToCar).toList();
        List<CarDto> result = repository.saveAll(createdCar)
                .stream()
                .map(CarDto::valueFrom)
                .toList();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping(path = "")
    public ResponseEntity<Collection<CarDto>> getAllCars(@RequestHeader HttpHeaders headers) {
        logHeaders(headers, log);
        return ResponseEntity.ok(repository.findAll().stream().map(CarDto::valueFrom).collect(toList()));
    }

    @PutMapping(path = "/{carId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCar(@RequestHeader HttpHeaders headers, @PathVariable UUID carId,
                              @Valid @RequestBody CarDto updatedCar) {
        logHeaders(headers, log);
        carService.updateCar(carId, CarDto.convertToCar(updatedCar));
    }

    @DeleteMapping(path = "/{carId}")
    public ResponseEntity<String> deleteCar(@RequestHeader HttpHeaders headers, @PathVariable UUID carId) {
        logHeaders(headers, log);
        boolean deleted = carService.deleteCar(carId);
        if (!deleted) {
            return ResponseEntity.badRequest().body(String.format("Car with id %s does not exists.", carId));
        }
        return ResponseEntity.ok(String.format("Car with id %s deleted.", carId));
    }

    @PostMapping("/{carId}/image")
    public ResponseEntity<UploadFileResponse> uploadImage(@RequestHeader HttpHeaders headers,
                                                         @PathVariable UUID carId,
                                                         @RequestParam("file") MultipartFile file) {
        logHeaders(headers, log);
        CarImage carImage = carImageService.storeImage(carId, file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/cars/" + carId + "/image/")
                .path(carImage.getFileName())
                .toUriString();
        UploadFileResponse response = new UploadFileResponse(
                carImage.getFileName(),
                fileDownloadUri,
                file.getContentType(),
                file.getSize()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(value = "/{carId}/image", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public @ResponseBody byte[] getImage(@RequestHeader HttpHeaders headers, @PathVariable UUID carId) {
        logHeaders(headers, log);
        CarImage carImage = carImageService.getCarImage(carId);
        return carImage.getData();
    }
    @Operation(summary = "Get image for a car")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Get image by car id",
                    content = {@Content(mediaType = "application/json")}
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized operation",
                    content = {@Content(mediaType = "application/json")}
            )
    })
    //nwm po co to w sumie
    @GetMapping(value = "/{carId}/image2")
    public ResponseEntity<Resource> getImage2(@RequestHeader HttpHeaders headers, @PathVariable UUID carId) {
        logHeaders(headers, log);
        CarImage carImage = carImageService.getCarImage(carId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(carImage.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + carImage.getFileName() + "\"")
                .body(new ByteArrayResource(carImage.getData()));
    }

    @Operation(summary = "Delete image for given car")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Image deleted",
                    content = {@Content(mediaType = "application/json")}
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized operation",
                    content = {@Content(mediaType = "application/json")}
            )
    })

    @DeleteMapping(value = "/{carId}/image")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeImage(@RequestHeader HttpHeaders headers, @PathVariable UUID carId) {
        logHeaders(headers, log);
        carImageService.deleteCarImage(carId);
    }


}
