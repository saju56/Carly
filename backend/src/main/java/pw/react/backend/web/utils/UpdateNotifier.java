package pw.react.backend.web.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class UpdateNotifier {

    public static final Logger logger = LoggerFactory.getLogger(UpdateNotifier.class);

    private static final String SERVICE_PARAMETER = "service";
    private static final String BOOKINGS_PARAMETER = "bookings";

    public final String booklyNotificationEndpoint;

    public UpdateNotifier(String booklyNotificationEndpoint) {
        this.booklyNotificationEndpoint = booklyNotificationEndpoint;
    }

    public void notifyBookly(List<UUID> bookingIds) throws IOException {
        logger.info("Notifying Bookly about change in Bookings: {}", bookingIds.toString());
        URL url = new URL(booklyNotificationEndpoint);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        Map<String, String> parameters = new HashMap<>();

        parameters.put(SERVICE_PARAMETER, "carly");
        parameters.put(BOOKINGS_PARAMETER, bookingIds.toString());

        connection.setDoOutput(true);
        DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
        outputStream.writeBytes(ParametersStringBuilder.getParamsString(parameters));
        outputStream.flush();
        outputStream.close();
    }
}
