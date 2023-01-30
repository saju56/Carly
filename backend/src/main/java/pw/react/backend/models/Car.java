package pw.react.backend.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(columnDefinition = "BINARY(16) DEFAULT (UUID_TO_BIN(UUID()))")
    private UUID id;
    @Column
    private String brand;
    @Column
    private String model;
    @Column
    private int seats;
    @Column
    private int doors;
    @Column
    private int mileage;
    @Column(name = "body_type")
    private String bodyType;
    @Column
    private String city;
    @Column
    private int vin;
    @Column(name = "fuel_type")
    private String fuelType;
    @Column
    private int year;
    @Column(name = "price_per_day")
    private int pricePerDay;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCarBrand() {
        return brand;
    }

    public void setCarBrand(String brand) {
        this.brand = brand;
    }

    public String getCarModel() {
        return model;
    }

    public void setCarModel(String model) {
        this.model = model;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public int getDoors() {
        return doors;
    }

    public void setDoors(int doors) {
        this.doors = doors;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public int getVin() {
        return vin;
    }

    public void setVin(int vin) {
        this.vin = vin;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(int pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getCity() {return city;}
    public void setCity(String city) {this.city = city;}
    public String getBodyType() {return bodyType;}
    public void setBodyType(String type) {this.bodyType = type;}
}
