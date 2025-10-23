import styled, {
  css
} from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const ImageWrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainImage = styled.img `
  width: 100%;
  max-height: 450px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ThumbnailWrapper = styled.div `
  width: 100%;
  margin-top: 1rem;

  .slick-slide {
    padding: 0 4px;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }
`;

export const ThumbnailImage = styled.img `
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.7;

  ${({ isActive }) =>
    isActive &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.primary};
      opacity: 1;
    `
  }

  &:hover {
    opacity: 1;
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);            
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 18px;
  cursor: pointer;
  z-index: 5;                           
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-50%) scale(1.1);
  }

  ${({ direction }) =>
    direction === "left"
      ? `left: 8px;`  
      : `right: 8px;`
  }
`;