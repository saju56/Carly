import {Car} from "../model/Car";
import {Key} from "react";


const BASE_URL = 'http://localhost:3001';

export const getCars = async () => {
    return fetch(`${BASE_URL}/cars`)
         .then(response => {
             if (response.ok)
                 return response.json();
             else throw response;
         })
}

export const getBookings = async () => {
    return fetch(`${BASE_URL}/bookings`)
         .then(response => {
             if (response.ok)
                 return response.json();
             else throw response;
         })
}

export const addCar = async (car: Car) => {
    return fetch(`${BASE_URL}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
    })
        .then(response => {
            if(response.ok)
                return response.json();
            else throw response;
        })
        
}

export const deleteCar = async (carId: Key) => {
    return fetch(`${BASE_URL}/cars/${carId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if(response.ok)
                return response.json();
            else throw response;
        })
        
}

export const deleteBookings = async (bookingId: Key) => {
    return fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if(response.ok)
                return response.json();
            else throw response;
        })
        
}