package pw.react.backend.web;

import pw.react.backend.models.Car;

import java.util.UUID;

public record CarDto(UUID id, String brand, String model, int seats, int doors,
                     String fuelType, int mileage, int vin, int year, int pricePerDay, String city, String bodyType) {
    public static CarDto valueFrom(Car car) {
        return new CarDto(car.getId(), car.getCarBrand(), car.getCarModel(), car.getSeats(),
                car.getDoors(), car.getFuelType(), car.getMileage(), car.getVin(), car.getYear(), car.getPricePerDay(),
                car.getCity(), car.getBodyType());
    }

    public static Car convertToCar(CarDto carDto) {
        Car car = new Car();
        car.setId(carDto.id());
        car.setCarBrand(carDto.brand());
        car.setCarModel(carDto.model());
        car.setDoors(carDto.doors());
        car.setSeats(carDto.seats());
        car.setYear(carDto.year());
        car.setFuelType(carDto.fuelType());
        car.setPricePerDay(carDto.pricePerDay());
        car.setVin(carDto.vin());
        car.setMileage(carDto.mileage());
        car.setCity(carDto.city());
        car.setBodyType(carDto.bodyType());
        return car;
    }
}
