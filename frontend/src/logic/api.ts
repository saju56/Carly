import {Car} from "../model/Car";
import {Key} from "react";


const BASE_URL = 'https://carly-backend-app.azurewebsites.net';




/*
export const getCars = async () => {
    return fetch(`${BASE_URL}/logic/api/cars`)
         .then(response => {
             if (response.ok)
                 return response.json();
             else throw response;
         })
}

export const getBookings = async () => {
    return fetch(`${BASE_URL}/logic/api/bookings`)
         .then(response => {
             if (response.ok)
                 return response.json();
             else throw response;
         })
}

export const addCar = async (car: Car) => {
    return fetch(`${BASE_URL}/logic/api/cars`, {
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
    return fetch(`${BASE_URL}/logic/api/cars/${carId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if(response.ok)
                return response.json();
            else throw response;
        })
}

export const deleteBookings = async (id: Key) => {
    return fetch(`${BASE_URL}/logic/api/bookings/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if(response.ok)
                return response.json();
            else throw response;
        })
}
*/