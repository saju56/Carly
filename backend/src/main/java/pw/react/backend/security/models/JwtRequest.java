package pw.react.backend.security.models;

import javax.validation.constraints.NotEmpty;
import java.io.Serial;
import java.io.Serializable;

public record JwtRequest(@NotEmpty String username, @NotEmpty String password) implements Serializable {
    @Serial
    private static final long serialVersionUID = 5926468583005150707L;
}
