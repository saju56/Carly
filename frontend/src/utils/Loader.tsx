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
                return <Grid>
                            <CircularProgress />
                            <Typography position='absolute'>{props.label}</Typography>
                        </Grid>;
            }
            return <Grid>
                        <CircularProgress />
                        <Typography position='absolute'>Loading</Typography>
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