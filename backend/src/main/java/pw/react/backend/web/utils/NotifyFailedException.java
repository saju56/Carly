package pw.react.backend.web.utils;

import java.io.Serial;

public class NotifyFailedException extends Exception {
    @Serial
    private static final long serialVersionUID = 1045960239187521789L;

    public NotifyFailedException(String errorMessage) {
        super(errorMessage);
    }
}
