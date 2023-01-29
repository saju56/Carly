import React, {useState} from 'react';
import AddCarForm from "./AddCarForm";
import {Car} from "../model/Car";
import Loader from "../utils/Loader";
import {addCar} from "../logic/api";

export interface AddCarProps {
    updateList: () => void;
}

const AddCarFormContainer: React.FC<AddCarProps> = (props: AddCarProps) => {
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    return (
        <Loader loading={saving} label={"Saving"}>
            <AddCarForm saveCar={(car)=>{setSaving(true);
                addCar(car)
                    .then(()=> props.updateList())
                    .catch(car => console.error(JSON.stringify(car)))
                    .finally(()=>setSaving(false))
        }} hideForm={()=>{setAdding(false); setSaving(false)}}></AddCarForm>
        </Loader>
    )
}

export default AddCarFormContainer;