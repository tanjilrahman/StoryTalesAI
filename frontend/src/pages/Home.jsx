import React from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Benefits from "../components/Benefits";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";

function Home() {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Pricing />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
}

export default Home;
