package pw.react.backend.controller;

import org.slf4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestHeader;

import static java.util.stream.Collectors.joining;

public class HeadersLogger {

    public static void logHeaders(@RequestHeader HttpHeaders headers, Logger logger) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }
}
