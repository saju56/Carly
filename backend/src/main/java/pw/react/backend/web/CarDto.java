package pw.react.backend.web;

import pw.react.backend.models.Car;
import pw.react.backend.models.Company;

import java.util.UUID;

public record CarDto(UUID id) {
    //dokonczyc
    public static CarDto valueFrom(Car car) {
        return new CarDto(car.getId(), car.getName(), car.getStartDateTime(), car.getBoardMembers());
    }
}
