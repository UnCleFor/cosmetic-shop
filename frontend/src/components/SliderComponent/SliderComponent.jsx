import React from "react";
import Slider from "react-slick";
import "./SliderComponent.css"

const SliderComponent = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide}
              alt={`slide-${index}`}
              className="slide-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
