import {Key} from "react";

export interface Car {
    "id": Key,
    "brand": string,
    "model": string,
    "status": boolean,
    "doors": Number,
    "seats": Number,
    "year": Number,
    "fuelType": string,
    "pricePerDay": Number,
    "vin": Number,
    "mileage": Number,
    "city": string,
    "bodyType": string
}