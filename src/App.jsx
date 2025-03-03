import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/DashboardUser"; // ✅ Import manquant

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard" element={<Dashboard />} /> {/* ✅ Correction du path */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

