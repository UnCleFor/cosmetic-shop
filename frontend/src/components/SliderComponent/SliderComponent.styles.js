import styled from 'styled-components';

// Wrapper cho slider
export const SliderWrapper = styled.div `
  position: relative;
  width: 100%;
  max-height: 500px;
  overflow: hidden;

  .slick-dots {
    bottom: 15px;
  }

  .slick-dots li button:before {
    font-size: 12px;
    color: #fff;
    opacity: 0.8;
  }

  .slick-dots li.slick-active button:before {
    color: ${({theme}) => theme.colors.primary}; /* màu primary của bạn */
    opacity: 1;
  }

  .slick-prev,
  .slick-next {
    z-index: 2;
    width: 40px;
    height: 40px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 32px;
    color: #fff;
  }
`;

// Ảnh trong slider
export const SlideImage = styled.img `
  width: 100%;
  height: 500px; /* cố định chiều cao */
  object-fit: cover;
  border-radius: 8px;
`;