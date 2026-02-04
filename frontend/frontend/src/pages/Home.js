import React from "react";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import FeaturedProducts from "../components/FeaturedProducts";
import OnSaleProducts from "../components/OnSaleProducts";
import DiscountPercent from "../components/DiscountPercent";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>

      <div className="p-10 lg:px-52">
        <section id="highlights" className="scroll-mt-32">
          <Highlights />
        </section>

        <section id="featured" className="scroll-mt-32">
          <FeaturedProducts />
        </section>

        <section id="onsale" className="scroll-mt-32">
          <OnSaleProducts />
        </section>

        <section id="discount" className="scroll-mt-32">
          <DiscountPercent />
        </section>
       
      </div>
        <Footer />
    </div>
  );
}

export default Home;
