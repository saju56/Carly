package pw.react.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.undertow.util.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.services.OfferService;
import pw.react.backend.services.data.OffersRequest;
import pw.react.backend.web.CarDto;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.List;

import static pw.react.backend.services.data.OffersRequest.NO_STRING_TYPE_PARAMETER;

@RestController
@RequestMapping(path = OfferController.OFFERS_PATH)
public class OfferController extends AbstractController {

    public static final String OFFERS_PATH = "/logic/api/offers";

    private static final Logger logger = LoggerFactory.getLogger(OfferController.class);
    private static final String DEFAULT_SORT = "brand";

    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @Operation(summary = "Get List of offers by parameters")
    @GetMapping(path = "")
    public ResponseEntity<Collection<CarDto>> getOffers(
            @RequestHeader HttpHeaders headers,
            @RequestParam(value = "location", required = false, defaultValue = NO_STRING_TYPE_PARAMETER) String location,
            @RequestParam Long dateFrom,
            @RequestParam Long dateTo,
            @RequestParam(value = "sortBy", required = false, defaultValue = DEFAULT_SORT) String sortBy,
            @RequestParam Integer page,
            @RequestParam Integer itemsOnPage,
            @RequestParam(value = "bodyType", required = false, defaultValue = NO_STRING_TYPE_PARAMETER) String bodyType,
            @RequestParam(value = "model", required = false, defaultValue = NO_STRING_TYPE_PARAMETER) String model)
            throws BadRequestException {
        // example for reference: 1643500000 => 2022-01-29T23:46:40
        LocalDateTime dateTimeFrom = LocalDateTime.ofEpochSecond(dateFrom, 0, ZoneOffset.UTC);
        LocalDateTime dateTimeTo = LocalDateTime.ofEpochSecond(dateTo, 0, ZoneOffset.UTC);
        logHeaders(headers, logger);
        OffersRequest request = new OffersRequest(location, dateTimeFrom, dateTimeTo, sortBy,
                page, itemsOnPage, bodyType, model);
        List<CarDto> result = offerService.getOffersByOfferRequest(request);
        return ResponseEntity.ok().body(result);
    }

}
