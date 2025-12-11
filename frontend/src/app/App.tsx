import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CatalogLoader from "../components/CatalogLoader";
import Footer from "../components/Footer";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <CatalogLoader path="/fall-2024.csv" />
      <Navbar />
      <Outlet /> 
      <Footer />
    </div>
  );
}
