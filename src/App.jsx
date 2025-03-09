import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";
import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";// Import manquant
import LoadingAnimation from "./pages/Loading";
import SmartSwatch from "./pages/SmartSwatch";
import Smartphone from "./pages/Smartphone";
import CGM from "./pages/CGM";
import Car from "./pages/Car"; 
import Map from "./pages/InteractiveMAP"; // Import manquant
import Closefriends from "./pages/CloseFriends";
import Notification from "./pages/Notification";
import Patient from "./pages/Patient" ;
import ProS from "./pages/ProS" ;
import RespoHop from "./pages/RespoHop" ;



// Import manquant



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="loading" element={<LoadingAnimation />} />
        <Route path="smartswatch" element={<SmartSwatch />} />
        <Route path="smartphone" element={<Smartphone />} />
        <Route path="cgm" element={<CGM />} />
        <Route path="car" element={<Car />} />
        <Route path="map" element={<Map />} />
        <Route path="closefriends" element={<Closefriends />} />
        <Route path="notification" element={<Notification />} />
        <Route path="patient" element={<Patient />} />
        <Route path="pros" element={<ProS />} />
        <Route path="respoHop" element={<RespoHop />} />
      </Route>

    )
  );

  return <RouterProvider router={router} />;
}

export default App;

