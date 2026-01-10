import React, { useState } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined, PictureOutlined } from "@ant-design/icons";
import "./ProductImageComponent.css";

// Arrow components
const PrevArrow = ({ onClick }) => (
  <button className="slick-arrow slick-prev" onClick={onClick}>
    <LeftOutlined />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button className="slick-arrow slick-next" onClick={onClick}>
    <RightOutlined />
  </button>
);

const ProductImageComponent = ({ images = [], name = "Product" }) => {
  // Placeholder image dùng base64 hoặc online service
  const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f8f9fa'/%3E%3Cpath d='M100 150 L200 100 L300 150 L250 250 L150 250 Z' fill='%23e9ecef' stroke='%23adb5bd' stroke-width='2'/%3E%3Ctext x='200' y='320' font-family='Arial' font-size='16' fill='%236c757d' text-anchor='middle'%3ENo Image Available%3C/text%3E%3C/svg%3E";

  console.log(images)
  // Xử lý images array
  const imageArray = React.useMemo(() => {
    if (!images || images.length === 0) {
      return [PLACEHOLDER_IMAGE];
    }
    
    // Filter out null/undefined/empty strings
    return images.filter(img => img && img.trim() !== "");
  }, [images]);

  const [mainImage, setMainImage] = useState(imageArray[0]);
  const [imageError, setImageError] = useState(false);

  // Xử lý khi ảnh chính bị lỗi
  const handleMainImageError = () => {
    setImageError(true);
    setMainImage(PLACEHOLDER_IMAGE);
  };

  // Xử lý khi thumbnail bị lỗi
  const handleThumbnailError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE;
    e.target.onerror = null;
  };

  // Cấu hình slider
  const sliderSettings = {
    slidesToShow: Math.min(4, imageArray.length),
    slidesToScroll: 1,
    infinite: imageArray.length > 4,
    arrows: imageArray.length > 4,
    dots: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, imageArray.length),
          arrows: false,
        }
      }
    ]
  };

  const hasMultipleImages = imageArray.length > 1 && !imageError;
  const isPlaceholderOnly = imageArray[0] === PLACEHOLDER_IMAGE;

  return (
    <div className="product-image-wrapper">
      {/* Ảnh chính */}
      <div className="main-image-container">
        <img 
          src={imageError ? PLACEHOLDER_IMAGE : mainImage}
          alt={name}
          className="main-image"
          onError={handleMainImageError}
        />
        
        {/* Badge số lượng ảnh */}
        {hasMultipleImages && !isPlaceholderOnly && (
          <div className="image-count-badge">
            <PictureOutlined /> {imageArray.length}
          </div>
        )}
        
        {/* Placeholder indicator */}
        {isPlaceholderOnly && (
          <div className="placeholder-indicator">
            <PictureOutlined />
            <span>Chưa có hình ảnh</span>
          </div>
        )}
      </div>

      {/* Thumbnail slider - chỉ hiển thị nếu có nhiều hơn 1 ảnh thực */}
      {hasMultipleImages && !isPlaceholderOnly && (
        <div className="thumbnail-slider-wrapper">
          <Slider {...sliderSettings} className="thumbnail-slider">
            {imageArray.map((img, index) => (
              <div key={index} className="thumbnail-slide">
                <img
                  src={img}
                  alt={`${name} - ${index + 1}`}
                  className={`thumbnail-image ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                  onError={handleThumbnailError}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Thông báo nếu chỉ có 1 ảnh placeholder */}
      {!hasMultipleImages && isPlaceholderOnly && (
        <div className="placeholder-message">
          <p>Chưa có hình ảnh cho sản phẩm này</p>
        </div>
      )}
    </div>
  );
};

export default ProductImageComponent;