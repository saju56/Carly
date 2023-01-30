import React, {useContext, useState} from 'react';
import AddCarForm from "./AddCarForm";
import {Car} from "../model/Car";
import Loader from "../utils/Loader";
import { Context } from '../App';
import { properties } from '../resources/properties';
import AddCarImageForm from "./AddCarImageForm";

export interface AddImageProps {
    updateImage: () => void;
    token: String;
    carId: String;
}

const AddCarImageFormContainer: React.FC<AddImageProps> = (props: AddImageProps) => {
    const [saving, setSaving] = useState(false);

    const addCarImage = async (img: string, token:String, carId: String) => {
        const auth = `Bearer ${token}`;
        const formData = new FormData();
        formData.append("file", img);
        console.log(formData);
        await fetch(`${properties.url}/logic/api/cars/${carId}/image`, {
            method: "POST",
            headers: {
                Authorization: auth,
            },
            body: formData

        })
            .then((response) => {
                console.log(response);
                if (response.ok) return response.json();
                else {
                    throw new Error("ERROR " + response.status);
                }
            })
            .then(() => {
                console.log("Success adding car image.");
            })
            .catch((e) => {
                console.log("Error when trying to add car image: " + e);
            })
    }

    return(
        <Loader loading={saving} label={"Saving"}>
            <AddCarImageForm carId={props.carId} saveImage={(carId: String, img: string) => {
                setSaving(true)
                addCarImage(img, props.token, carId)
                    .catch(e => console.error(JSON.stringify(e)))
                    .finally(()=> {
                        setSaving(false)
                        props.updateImage();
                    });
            }}/>
        </Loader>
    );
}

export default AddCarImageFormContainer;