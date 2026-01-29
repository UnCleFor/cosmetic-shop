import React from "react";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import "./FooterComponent.css";

function FooterComponent() {
  return (
    <footer className="footer">
      {/* Left */}
      <div className="footer-left">
        <img
          src="../../assets/images/logo200.jpg"
          alt="Logo200"
          className="footer-logo"
        />

        <div className="footer-info">
          <span>📍 Số 534, Đường Lê Thị Hồng Gấm, Phường Thái Sơn, TP.Mỹ Tho, Tỉnh Đồng Tháp</span>
          <span>📞 0342 835 777</span>
          <span>✉️ sarahtrannn299@gmail.com</span>
        </div>
      </div>

      {/* Right */}
      <div className="footer-right">
        <a
          href="https://www.facebook.com/profile.php?id=100094369668751"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <FacebookOutlined />
        </a>

        <a
          href="https://www.instagram.com/ngoc_nhu_medical_spa"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <InstagramOutlined />
        </a>
      </div>
    </footer>
  );
}

export default FooterComponent;