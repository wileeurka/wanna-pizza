import React from "react";
import Header from "../app/Header";
import { Outlet, useLocation } from "react-router-dom";
import "./mainLayout.css";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {location.pathname === "/" && (
          <div className="verification-message">
            You have been successfully verified! Refresh the page and log in to
            your account.
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
