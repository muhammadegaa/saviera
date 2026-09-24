import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Archetypes from "./pages/Archetypes";
import Dashboard from "./pages/Dashboard";
import Healr from "./pages/Healr";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SavToWear from "./pages/SavToWear";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/01-archetypes" element={<Archetypes />} />
        <Route path="/01-omnia" element={<Product slug="omnia" />} />
        <Route path="/01-wei-yi" element={<Product slug="wei-yi" />} />
        <Route path="/01-cyanne" element={<Product slug="cyanne" />} />
        <Route path="/sav-to-wear-01" element={<SavToWear />} />
        <Route path="/healr" element={<Healr />} />
        <Route path="/savdashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}
