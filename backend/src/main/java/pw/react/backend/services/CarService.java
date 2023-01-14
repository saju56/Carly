package pw.react.backend.services;

import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Car;

import java.util.UUID;

public interface CarService {
    Car updateCar(UUID id, Car updatedCar) throws ResourceNotFoundException;

    boolean deleteCar(UUID id);
}
