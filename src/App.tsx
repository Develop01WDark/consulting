import { Routes, Route } from "react-router-dom";
import { FiltersProvider } from "./context/filters.jsx";
import "./App.css";
import "./styles/index.scss";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import BannerSlider from "./components/banner/banner-slider";
import AboutUsServices from "./components/about-us-services";
import Certifications from "./components/certifications";
import ContactUsCourses from "./components/contact-us-courses";
import BannerDisruptivo from "./components/banner-disruptivo";
import HowItWork from "./components/how-it-works";
import ContactUs from "./components/contact-us";
import Allies from "./components/allies";
import Ecommerce from "./components/Ecommerce.jsx";
import { useState } from "react";

function Home() {
  return (
    <>
      <BannerSlider />
      <AboutUsServices />
      <Certifications />
      <ContactUsCourses />
      <BannerDisruptivo />
      <HowItWork />
      <ContactUs />
      <Allies />
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <>
      <Header />
      <main>
        <FiltersProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
          </Routes>
        </FiltersProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
