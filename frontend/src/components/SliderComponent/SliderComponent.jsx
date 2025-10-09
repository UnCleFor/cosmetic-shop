import React from "react";
import Slider from "react-slick";
import { SlideImage, SliderWrapper } from "./SliderComponent.styles";

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
    <SliderWrapper>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <SlideImage src={slide} alt={`slide-${index}`} />
          </div>
        ))}
      </Slider>
    </SliderWrapper>
  );
};

export default SliderComponent;
