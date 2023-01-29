package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import pw.react.backend.dao.CarRepository;
import pw.react.backend.exceptions.ResourceNotFoundException;
import pw.react.backend.models.Car;
import pw.react.backend.services.data.OffersRequest;
import pw.react.backend.web.CarDto;

import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

public class CarMainService implements CarService{

    private final Logger logger = LoggerFactory.getLogger(CarMainService.class);
    private final CarRepository repository;

    public CarMainService(CarRepository carRepository) {
        this.repository = carRepository;
    }

    @Override
    public Car updateCar(UUID id, Car updatedCar) throws ResourceNotFoundException {
        if (repository.existsById(id)) {
            updatedCar.setId(id);
            Car result = repository.save(updatedCar);
            logger.info("Car with id {} updated.", id);
            return result;
        }
        throw new ResourceNotFoundException(String.format("Car with id [%s] not found.", id));
    }

    @Override
    public boolean deleteCar(UUID id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        logger.info("Car with id {} deleted.", id);
        return true;
    }

    @Override
    public List<CarDto> getAllCars() {
        return repository.findAll()
                .stream()
                .map(CarDto::valueFrom)
                .collect(toList());
    }

    @Override
    public List<CarDto> saveManyCars(List<Car> cars) {
        return repository.saveAll(cars)
                .stream()
                .map(CarDto::valueFrom)
                .toList();
    }

    @Override
    public CarDto getCarById(UUID id) throws ResourceNotFoundException {
        return repository.findById(id)
                .map(CarDto::valueFrom)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Car with %s does not exist", id)));
    }

    @Override
    public CarDto saveCar(Car car) {
        return CarDto.valueFrom(repository.save(car));
    }

    @Override
    public List<CarDto> getAvailableCarsForRequest(OffersRequest offersRequest) {
        boolean sortAscending = offersRequest.sortBy().isBlank() || offersRequest.sortBy().charAt(0) != '-';
        return repository.findAvailableCarsForIntervalAndBodyTypeSortBy(
                offersRequest.dateFrom(),
                offersRequest.dateTo(),
                offersRequest.bodyType(),
                offersRequest.location(),
                offersRequest.model(),
                sortAscending ?
                        Sort.by(offersRequest.sortBy()).ascending() :
                        Sort.by(offersRequest.sortBy().substring(1)).descending())
                .stream().map(CarDto::valueFrom)
                .toList();
    }
}
