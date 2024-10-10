
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import Servicio from "./components/pages/Servicio";
import HomeInitialAUTH from "./components/pages/HomeAuth";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import BusinessOwner from "./components/Owner/businessowner";
import ServiceJob from "./components/Owner/Jobservi/Servicejob";
import Establishments from "./components/Owner/Jobestablis/Establishments";
import ImageDisplay from "./components/pages/ImageDisplay";
import Configprofiles from "./components/auth/Configprofiles";
import Intro from "./components/pages/Intro";
import Turno from "./components/pages/Turno";


function App() {
  return (
    <Router>
      <div className="App-header">
        <Routes>
        <Route path="/" element={<Intro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/HomeInitialAUTH" element={<HomeInitialAUTH />} />
          <Route path="/Servicio" element={<Servicio />} />
          <Route path="/BusinessOwner" element={<BusinessOwner />} />
          <Route path="/ServiceJob" element={<ServiceJob/>}/>
          <Route path="/Establishments" element={<Establishments/>}/>
          <Route path="ImageDisplay" element={<ImageDisplay/>}/>
          <Route path="/Configprofiles" element={<Configprofiles />}/>          
          <Route path="/Turno" element={<Turno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
