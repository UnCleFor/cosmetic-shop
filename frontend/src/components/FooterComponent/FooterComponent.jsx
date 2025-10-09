import React from "react";
import {
  FooterWrapper,
  FooterLeft,
  Logo,
  Info,
  FooterRight,
  FacebookIcon,
  InstagramIcon,
} from "./FooterComponent.styles";

function FooterComponent() {
  return (
    <FooterWrapper>
      {/* Bên trái: Logo và thông tin liên hệ */}
      <FooterLeft>
        <Logo src="../../assets/images/logo200.jpg" alt="Logo200" />
        <Info>
          <span>📍 534 Lê thị hồng gấm phường Thái Sơn, Mỹ Tho, Đồng Tháp</span>
          <span>📞 0342 835 777</span>
          <span>✉️ sarahtrannn299@gmail.com</span>
        </Info>
      </FooterLeft>

      {/* Bên phải: Icon social */}
      <FooterRight>
        <a href="https://www.facebook.com/profile.php?id=100094369668751" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://www.instagram.com/ngoc_nhu_medical_spa" target="_blank" rel="noreferrer">
          <InstagramIcon />
        </a>
      </FooterRight>
    </FooterWrapper>
  );
}

export default FooterComponent;
