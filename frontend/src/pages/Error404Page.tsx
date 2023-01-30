import { Grid, Typography } from '@mui/material';

function Error404Page  () {
    return (
      <Grid container direction="column" display='flex' alignItems="center" justifyContent="center"  style={{height: '81vh'}}>
        <Typography variant="h3">Wrong path</Typography>
      </Grid>
    );
  };
  
  export default Error404Page;