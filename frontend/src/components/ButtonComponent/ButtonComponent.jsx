import React from "react";
import { StyledButton } from "./ButtonComponent.styles";

const ButtonComponent = ({ children, onClick, type = "button" }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default ButtonComponent;
