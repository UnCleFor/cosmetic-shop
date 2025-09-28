import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

function MainLayout({ isShowHeader = true, isShowFooter = true }) {
  return (
    <div>
      { isShowHeader && <HeaderComponent />}
      <main>
        <Outlet />
      </main>
      { isShowFooter && <FooterComponent />}
    </div>
  );
}

export default MainLayout;