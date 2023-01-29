package pw.react.backend.services;

import io.undertow.util.BadRequestException;
import pw.react.backend.services.data.OffersRequest;
import pw.react.backend.web.CarDto;

import java.util.List;

public interface OfferService {

    List<CarDto> getOffersByOfferRequest(OffersRequest offersRequest) throws BadRequestException;
}
