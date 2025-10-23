import React, { useState } from "react";
import Slider from "react-slick";
import {
  ImageWrapper,
  MainImage,
  ThumbnailWrapper,
  ThumbnailImage,
  ArrowButton,
} from "./styles";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const ProductImageComponent = ({ image }) => {
  const images = [
    image,
    "./assets/images/slide2.png",
    "./assets/images/slide1.png",
    "./assets/images/slide3.png",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  const PrevArrow = ({ onClick }) => (
    <ArrowButton direction="left" onClick={onClick}>
      <LeftOutlined />
    </ArrowButton>
  );

  const NextArrow = ({ onClick }) => (
    <ArrowButton direction="right" onClick={onClick}>
      <RightOutlined />
    </ArrowButton>
  );

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };


  return (
    <ImageWrapper>
      <MainImage src={mainImage} alt="Product" />
      <ThumbnailWrapper>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <ThumbnailImage
                src={img}
                alt={`sub-${index}`}
                isActive={mainImage === img}
                onClick={() => setMainImage(img)}
              />
            </div>
          ))}
        </Slider>
      </ThumbnailWrapper>
    </ImageWrapper>
  );
};

export default ProductImageComponent;
