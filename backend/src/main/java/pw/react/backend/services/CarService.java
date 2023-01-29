package pw.react.backend.services;

import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Car;
import pw.react.backend.services.data.OffersRequest;
import pw.react.backend.web.CarDto;

import java.util.List;
import java.util.UUID;

public interface CarService {

    Car updateCar(UUID id, Car updatedCar) throws ResourceNotFoundException;
    boolean deleteCar(UUID id);
    List<CarDto> getAllCars();
    List<CarDto> saveManyCars(List<Car> cars);
    CarDto getCarById(UUID id);
    CarDto saveCar(Car car);
    List<CarDto> getAvailableCarsForRequest(OffersRequest offersRequest);
}
