import React, {useContext, useState} from 'react';
import AddCarForm from "./AddCarForm";
import {Car} from "../model/Car";
import Loader from "../utils/Loader";
import { Context } from '../App';
import { properties } from '../resources/properties';

export interface AddCarProps {
    updateList: () => void;
    token: String;
}

const AddCarFormContainer: React.FC<AddCarProps> = (props: AddCarProps) => {
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);


    const addCar = async (car: Car, token: String) => {
        const auth = `Bearer ${token}`;
        console.log(token);
        console.log(JSON.stringify({car}));
        await fetch(`${properties.url}/logic/api/cars`, {
          method: "POST",
          headers: {
              'Authorization': auth,
              "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
              "brand": car.brand,
              "model": car.model,
              "seats": car.seats,
              "doors": car.doors,
              "fuelType": car.fuelType,
              "mileage": car.mileage,
              "vin": car.vin,
              "year": car.year,
              "pricePerDay": car.pricePerDay,
              "city": car.city,
              "bodyType": car.bodyType
          })

        })
          .then((response) => {
            if (response.ok) return response.json();
            else {
              throw new Error("ERROR " + response.status);
            }
          })
          .then(() => {
            console.log("Success adding car.");
          })
          .catch((e) => {
            console.log("Error when trying to add car: " + e);
          })
      };

    // const addCarImage = async (img: String) => {
    //     await fetch()
    // }


    return (
        <Loader loading={saving} label={"Saving"}>
            <AddCarForm saveCar={(car)=>{setSaving(true);
                   addCar(car, props.token)
                    .then(()=> props.updateList())
                    .catch(car => console.error(JSON.stringify(car)))
                    .finally(()=>setSaving(false))
        }} ></AddCarForm>
        </Loader>
    )
}

export default AddCarFormContainer;