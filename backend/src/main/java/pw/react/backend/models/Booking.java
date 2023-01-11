package pw.react.backend.models;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue
    private UUID id;
    @Column
    private UUID userId;
    @Column
    private UUID carId;
    @Column
    private LocalDateTime startDate;
    @Column
    private LocalDateTime endDate;

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public void setUserId(UUID userId){
        this.userId = userId;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setCarId(UUID carId) {
        this.carId = carId;
    }
    public UUID getCarId(){
        return carId;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getId() {
        return id;
    }
}
