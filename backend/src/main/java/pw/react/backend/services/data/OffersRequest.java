package pw.react.backend.services.data;

import java.time.LocalDateTime;

public record OffersRequest(String location,
                            LocalDateTime dateFrom,
                            LocalDateTime dateTo,
                            String sortBy,
                            Integer page,
                            Integer itemsOnPage,
                            String bodyType) {
    // Equal to % as in SQL it will mean to take every string
    public static final String NO_STRING_TYPE_PARAMETER = "%";
}
