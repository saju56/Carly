import {
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import React, { createContext, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Cars from "./pages/Cars";
import Bookings from "./pages/Bookings";
import Layout from "./pages/Layout";
import Error404Page from "./pages/Error404Page";
import { StepContext } from "@mui/material";
import { tokenToString } from "typescript";

export type UserAttributes = {
  token: String
  setToken:(t: String) => void
}

export const Context = createContext<UserAttributes>({
token: '',
setToken: () => {},
});


function App() {
  const [token, setToken] = useState<String>('')
  
  return (
    <Context.Provider value={{ token, setToken}}>
  <div className="AppWrapper">
    <div className="Layout">
    <Layout />
    </div>
    <div className="App">
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/Cars" element={<Cars />}/>
      <Route path="/Bookings" element={<Bookings />}/>
      <Route path="*" element={<Error404Page/>} />
    </Routes>
    </div>
  </div>    
  </Context.Provider>
  );
}

export default App;


