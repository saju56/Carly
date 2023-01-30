import React, { useState } from "react";
import { Car } from "../model/Car";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface AddImageFormProps {
    saveImage: (carId: String, img: string) => void;
    carId: String;
}

const AddImageCarForm: React.FC<AddImageFormProps> = (props: AddImageFormProps) => {
    const [open, setOpen] = React.useState(true);
    const [image, setImage] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
            console.log("Submit image")
            props.saveImage(props.carId, image);
    }
    const onLoad = (fileString) => {
        console.log(fileString);
        setImage(fileString);
    }

    return(
        <Dialog open={open}>
            <Grid container>
                <Box
                    sx={{ m: 1 }}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
                        car image
                    </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                    <Card
                        style={{
                            height: "20vh",
                            margin: "auto",
                            flexDirection: "column",
                        }}
                    >
                        <input
                            id="outlined-full-width"
                            style={{ margin: 8 }}
                            name="upload-photo"
                            accept='.jpg,.jpeg,.png'
                            type="file"

                            onChange={(e) => {
                                if (e.target.files !== null) {
                                    onLoad(e.target.files[0]);
                                }
                            }}/>
                    </Card>
                </Box>
            </Grid>
            <Button
                onClick={handleSubmit}
                color="inherit"
                disabled={false}
                size="small"
                variant="outlined"
                style={{
                    position: "absolute",
                    bottom: "1.5%",
                    right: "1.5%",
                }}
            >
                submit
            </Button>
            <IconButton
                aria-label="delete"
                onClick={handleClose}
                size="medium"
                style={{
                    position: "absolute",
                    top: "1.5%",
                    right: "1.5%",
                }}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
        </Dialog>
    );
}

export default AddImageCarForm;