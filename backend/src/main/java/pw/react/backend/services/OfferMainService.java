package pw.react.backend.services;

import io.undertow.util.BadRequestException;
import pw.react.backend.services.data.OffersRequest;
import pw.react.backend.web.CarDto;

import java.util.List;

public class OfferMainService implements OfferService {

    private final CarService carService;

    public OfferMainService(CarService carService) {
        this.carService = carService;
    }

    @Override
    public List<CarDto> getOffersByOfferRequest(OffersRequest offersRequest) throws BadRequestException {
        if (offersRequest.dateFrom().isAfter(offersRequest.dateTo())) {
            throw new BadRequestException("Date to is before date from");
        }
        List<CarDto> result = carService.getAvailableCarsForRequest(offersRequest);
        // enumerate pages from 0
        int offset = offersRequest.page()*offersRequest.itemsOnPage();
        return result.subList(
                Math.min(result.size(), offset),
                Math.min(result.size(), offset + offersRequest.itemsOnPage()));
    }
}
