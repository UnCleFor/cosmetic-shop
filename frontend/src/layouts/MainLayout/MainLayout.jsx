import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./MainLayout.css"

function MainLayout({ isShowHeader = true, isShowFooter = true }) {
  return (
    <div className="main-layout">
      { isShowHeader && <HeaderComponent />}
      <main className="main-content">
        <Outlet />
      </main>
      { isShowFooter && <FooterComponent />}
    </div>
  );
}

export default MainLayout;