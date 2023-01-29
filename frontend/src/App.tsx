import {
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Cars from "./pages/Cars";
import Bookings from "./pages/Bookings";
import Layout from "./pages/Layout";
import Error404Page from "./pages/Error404Page";

function App() {

  return (
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
  );
}

export default App;


