package pw.react.backend.models;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue
    private UUID id;
    @Column
    private String brand;
    @Column
    private String model;
    @Column
    private boolean isTaken;
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
    private long vin;
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
    public boolean getStatus() {
        return isTaken;
    }

    public void setStatus(boolean isTaken) {
        this.isTaken = isTaken;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public int getDoors() {
        return seats;
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

    public long getVin() {
        return vin;
    }

    public void setVin(long vin) {
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
