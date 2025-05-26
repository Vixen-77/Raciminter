import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import React from "react";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";
import PatientSignup from "./pages/PatientSignup";
import ProSignup from "./pages/ProSignup";
import RespSignup from "./pages/RespSignup";
import LoginSig from "./pages/LoginSig";
import PatientSignin from "./pages/PatientSignin";
import LoadingAnimation from "./pages/Loading";
import ProSignin from "./pages/ProSignin";
import RespSignin from "./pages/RespSignin";
import Patient from "./pages/Patient";
import Help from "./pages/help";
import ProS from "./pages/ProS";
import RedirProS from "./pages/RedirPros";
import Resp from "./pages/Resp";
import Listproches from "./pages/ListProches";
import HistPro from "./pages/HistPro";
import HistPat from "./pages/HistPat";
import AccountSettings from "./pages/AccountSettings";
import Moderation from "./pages/Moderation";
import Alerte from "./pages/Alert";
import MedRec from "./pages/MedRec";
import Alertep from "./pages/Alertp";
import Fin from "./pages/fin"
import Features from "./pages/Features";
import Loading2 from "./pages/LoadingDoneinscription"
import { DarkModeProvider } from "./components/layouts/DarkModeContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/loading" element={<LoadingAnimation />} />
        <Route path="/fin" element={<Fin />} />  {/* ✅ TA PAGE "fin" SANS LAYOUT */}
        <Route path="/LoadingDoneinscription" element={<Loading2/>}/>
        <Route path="/alerte" element={<Alerte />} /> {/* ✅ TA PAGE "alerte" SANS LAYOUT */}
        <Route path="/alertep" element={<Alertep />} /> {/* ✅ TA PAGE "alertep" SANS LAYOUT */}
        {/* Routes SANS RootLayout */}
        <Route path="HistPat" element={<HistPat />} />
        {/* Routes AVEC RootLayout */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="LoginSig" element={<LoginSig />} />
          <Route path="PatientSignup" element={<PatientSignup />} />
          <Route path="ProSignup" element={<ProSignup />} />
          <Route path="RespSignup" element={<RespSignup />} />
          <Route path="PatientSignin" element={<PatientSignin />} />
          <Route path="ProSignin" element={<ProSignin />} />
          <Route path="RespSignin" element={<RespSignin />} />
          <Route path="Patient" element={<Patient />} />
          <Route path="Help" element={<Help />} />
          <Route path="AccountSettings" element={<AccountSettings />} />
          <Route path="ProS" element={<ProS />} />
          <Route path="Resp" element={<Resp />} />
          <Route path="RedirProS" element={<RedirProS />} />
          <Route path="HistPro" element={<HistPro />} />
          <Route path="HistPat" element={<HistPat />} />
          <Route path="Listproches" element={<Listproches />} />
          <Route path="Moderation" element={<Moderation />} />
          <Route path="MedRec" element={<MedRec />} />
        </Route>
      </>
    )
  );

  return (
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  );
}

export default App;

