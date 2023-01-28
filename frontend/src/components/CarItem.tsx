import React, {useState} from 'react';
import {Car} from "../model/Car";
import Loader from "../utils/Loader";
import { updateCommaList } from 'typescript';
import { Box, Card, makeStyles, Typography } from '@mui/material';



export interface CarItemProps {
    car: Car;
    updateList: () => void;
}

const EmployeeListItem: React.FC<CarItemProps> = (props: CarItemProps) => {
    const [deleting, setDeleting] = useState(false);
    
    const theme = {
        spacing: 8,
      }

    return (
        <Loader loading={deleting} label="Deleting">
            <Box sx={{ m: 1 }}>
                <Card>
                    <Typography>{props.car.id}.</Typography>
                    <Typography>{props.car.brand}</Typography>
                    <Typography>{props.car.model}</Typography>
                </Card>
            </Box> 
        </Loader>
    );
}



export default EmployeeListItem;