package pw.react.backend.models;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "company")
public class Company implements Serializable {

    @Serial
    private static final long serialVersionUID = -6783504532088859179L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @Column(name = "start_date")
    private LocalDateTime startDateTime;
    /**
     * By default, the column name in the database is going to be board_members
     */
    @Column
    private int boardMembers;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public int getBoardMembers() {
        return boardMembers;
    }

    public void setBoardMembers(int boardMembers) {
        this.boardMembers = boardMembers;
    }
}
