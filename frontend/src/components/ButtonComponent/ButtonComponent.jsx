import React from "react";
import "./ButtonComponent.css"

const ButtonComponent = ({ children, onClick, type = "button" }) => {
  return (
    <button
      onClick={onClick} 
      type={type}
      className="btn-primary">
      {children}
    </button>
  );
};

export default ButtonComponent;
