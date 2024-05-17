import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";

function PricingPage() {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Pricing />
        <Footer />
      </div>
    </>
  );
}

export default PricingPage;
