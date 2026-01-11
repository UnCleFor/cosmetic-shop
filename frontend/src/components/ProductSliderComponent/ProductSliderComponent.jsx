import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ProductCardComponent from '../ProductCardComponent/ProductCardComponent';
import './ProductSliderComponent.css';

const ProductSlider = ({ products = [] }) => {
    return (
        <div className="product-slider-container">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id || product._id}>
                        <ProductCardComponent product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;