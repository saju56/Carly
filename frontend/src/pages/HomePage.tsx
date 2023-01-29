import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AppBar, Button, Card, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../App';
import { properties } from '../resources/properties';

type Credentials = {
  username: string,
  password: string
}

export type Token = {
  jwttoken : String
}

function HomePage  ()  {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({ username : "", password : "" })
  const [credInvalid, setCredInvalid] = useState(false)
  const {token, setToken} = useContext(Context);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    setCredInvalid(true)
    await fetch(properties.url+'/authenticate', {
    await fetch('http://192.168.0.213:8080/authenticate', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      if (response.ok)
          return response.json()
      else{
        throw new Error("ERROR " + response.status)
      }
    }).then((token: Token) => {
      console.log(token);
      setToken(token.jwttoken);
      console.log("Success logging in.")
      setCredInvalid(false)
    }).catch((e) => {
      setCredInvalid(true)
      console.log("Error when trying to log in: " + e)
    })
  };

  useEffect(() => {
    if (!credInvalid) {
      
    }
  }, [credInvalid])

    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{height: "9vh"}}>
        <Toolbar style={{backgroundColor: '#DADEEA'}}>
        </Toolbar>
      </AppBar>
      
      <Grid container direction="column" display='flex' alignItems="center" justifyContent="center" style={{width: "100%", height: "81vh"}}>
      <Card sx={{ m: 1 }} style={{width: "50vh", height: "55vh"}}>
      <Grid container direction="column" display='flex' alignItems="center" justifyContent="center" style={{width: "100%", height: "100%"}}>
        <Grid item sx={{marginBottom: "50px"}}>
          <Typography variant="h4">login</Typography>
        </Grid>

        <Grid item sx={{marginBottom: "10px"}}>
          <TextField sx={{width: '35vh'}}
            onChange={(e)=>setCredentials({username: e.target.value, password: credentials.password})}
            label="Username" 
            id="outlined-size-normal" 
             />
        </Grid>


        <Grid item sx={{marginBottom: "20px"}}>
        <FormControl sx={{ m: 1, width: '35vh' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={(e)=>setCredentials({password: e.target.value, username: credentials.username})}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </Grid>

        <Grid item>
          <Button 
            color="inherit"
            disabled={false}
            onClick={handleLogin}
            size="small"
            variant="outlined"
            >Log in</Button>
        </Grid>

      </Grid>

      </Card>
      </Grid>
    
    </Box>

    );
  };
  
  export default HomePage;