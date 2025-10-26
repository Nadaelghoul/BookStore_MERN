/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function Hero({ deviceType = "desktop" }) {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={deviceType !== "mobile"}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      <div className="relative w-full min-h-[260px] h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <img src="/img_1.jpg" alt="view1" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="relative w-full min-h-[260px] h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <img src="/img_2.jpg" alt="view2" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="relative w-full min-h-[260px] h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <img src="/img_3.jpg" alt="view3" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </Carousel>
  );
}

export default Hero;
