import React, {useContext, useState} from 'react';
import AddCarForm from "./AddCarForm";
import {Car} from "../model/Car";
import Loader from "../utils/Loader";
import { Context } from '../App';
import { properties } from '../resources/properties';

export interface AddCarProps {
    updateList: () => void;
}

const AddCarFormContainer: React.FC<AddCarProps> = (props: AddCarProps) => {
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const { token, setToken } = useContext(Context);


    const addCar = async (car: Car) => {
        await fetch(`${properties.url}/logic/api/cars`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          body: JSON.stringify(car)
          },
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


    return (
        <Loader loading={saving} label={"Saving"}>
            <AddCarForm saveCar={(car)=>{setSaving(true);
                   addCar(car)
                    .then(()=> props.updateList())
                    .catch(car => console.error(JSON.stringify(car)))
                    .finally(()=>setSaving(false))
        }} ></AddCarForm>
        </Loader>
    )
}

export default AddCarFormContainer;