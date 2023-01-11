package pw.react.backend.models;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    @Column
    private UUID userId;
    @Column
    private UUID carId;
    @Column
    private Date startDate;
    @Column
    private Date endDate;

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
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
    @Id
    public UUID getId() {
        return id;
    }

}
