package pw.react.backend.exceptions;

public class UnauthorizedException extends RuntimeException {

    private final String path;

    public UnauthorizedException(String message, String path) {
        super(message);
        this.path = path;
    }

    public String getPath() {
        return path;
    }
}
