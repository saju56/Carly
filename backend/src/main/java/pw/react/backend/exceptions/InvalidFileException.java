package pw.react.backend.exceptions;

/** Created by Pawel Gawedzki on 06-Oct-2019. */
public class InvalidFileException extends RuntimeException {
    public InvalidFileException(String message) {
        super(message);
    }

    public InvalidFileException(String message, Throwable cause) {
        super(message, cause);
    }
}
