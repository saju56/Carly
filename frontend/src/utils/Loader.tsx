import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';

interface LoaderInnerProps {
    loading: boolean;
    label?: string;
}

export declare type LoaderProps = React.PropsWithChildren<LoaderInnerProps>;

const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {

    const loadingMessage = () => {   
        if (props.loading) {
            if (props.label) {
                return <Grid container direction="column" display='flex' alignItems="center" justifyContent="center"  style={{height: '81vh'}}>
                            <CircularProgress />
                            <Typography>{props.label}</Typography>
                        </Grid>;
            }
            return <Grid container direction="column" display='flex' alignItems="center" justifyContent="center"  style={{height: '81vh'}}>
                        <CircularProgress />
                        <Typography>Loading</Typography>
                    </Grid>;
        }
        return '';
    }
    
    return (
        <>
          {props.loading ? loadingMessage() : props.children}
        </>
    )
}

export default Loader;