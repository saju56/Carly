package pw.react.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Car;
import pw.react.backend.models.CarImage;
import pw.react.backend.services.CarService;
import pw.react.backend.services.ImageService;
import pw.react.backend.web.CarDto;
import pw.react.backend.web.UploadFileResponse;

import javax.validation.Valid;
import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping(path = CarController.CARS_PATH)
public class CarController extends AbstractController {

    public static final String CARS_PATH = "/logic/api/cars";

    private static final Logger log = LoggerFactory.getLogger(CarController.class);

    private final CarService carService;
    private final ImageService carImageService;

    public CarController(CarService carService, ImageService carImageService) {
        this.carService = carService;
        this.carImageService = carImageService;
    }

    @Operation(summary = "Get car by Id")
    @GetMapping(path = "/{carId}")
    public ResponseEntity<CarDto> getCar(@RequestHeader HttpHeaders headers, @PathVariable UUID carId)
            throws ResourceNotFoundException {
        logHeaders(headers, log);
        CarDto result = carService.getCarById(carId);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Create car")
    @PostMapping(path = "")
    public ResponseEntity<CarDto> createCar(@RequestHeader HttpHeaders headers,
                                                                  @Valid @RequestBody CarDto cars) {
        logHeaders(headers, log);
        Car createdCars = CarDto.convertToCar(cars);
        CarDto result = carService.saveCar(createdCars);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    //@CrossOrigin(origins = { "http://localhost:3000/Cars", "http://localhost:3000/" })
    @Operation(summary = "Get all cars")
    @GetMapping(path = "")
    public ResponseEntity<Collection<CarDto>> getAllCars(@RequestHeader HttpHeaders headers) {
        logHeaders(headers, log);
        return ResponseEntity.ok(carService.getAllCars());
    }

    @Operation(summary = "Update car by Id")
    @PutMapping(path = "/{carId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCar(@RequestHeader HttpHeaders headers, @PathVariable UUID carId,
                              @Valid @RequestBody CarDto updatedCar) {
        logHeaders(headers, log);
        carService.updateCar(carId, CarDto.convertToCar(updatedCar));
    }

    @Operation(summary = "Delete car by Id")
    @DeleteMapping(path = "/{carId}")
    public ResponseEntity<String> deleteCar(@RequestHeader HttpHeaders headers, @PathVariable UUID carId) {
        logHeaders(headers, log);
        boolean deleted = carService.deleteCar(carId);
        if (!deleted) {
            return ResponseEntity.badRequest().body(String.format("Car with id %s does not exists.", carId));
        }
        return ResponseEntity.ok(String.format("Car with id %s deleted.", carId));
    }

    @Operation(summary = "Upload image for a car")
    @PostMapping("/image/{carId}")
    public ResponseEntity<UploadFileResponse> uploadImage(@RequestHeader HttpHeaders headers,
                                                         @PathVariable UUID carId,
                                                         @RequestParam("file") MultipartFile file) {
        logHeaders(headers, log);
        CarImage carImage = carImageService.storeImage(carId, file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/cars/image/"+ carId+"/")
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

    @Operation(summary = "Get image in bytes for a car")
    @GetMapping(value = "/image/{carId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
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
    @GetMapping(value = "/image2/{carId}")
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

    @DeleteMapping(value = "/image/{carId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeImage(@RequestHeader HttpHeaders headers, @PathVariable UUID carId) {
        logHeaders(headers, log);
        carImageService.deleteCarImage(carId);
    }


}
