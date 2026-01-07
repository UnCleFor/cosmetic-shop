import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { MainLayoutWrapper } from "./styles";

function MainLayout({ isShowHeader = true, isShowFooter = true }) {
  return (
    <MainLayoutWrapper >
      { isShowHeader && <HeaderComponent />}
      <main>
        <Outlet />
      </main>
      { isShowFooter && <FooterComponent />}
    </MainLayoutWrapper>
  );
}

export default MainLayout;