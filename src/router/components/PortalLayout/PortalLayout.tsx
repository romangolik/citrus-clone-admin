import React, { FC } from "react";

import { Outlet } from "react-router-dom";

import Header from "@components/layout/Header";
import Sidebar from "@components/layout/Sidebar";
import ProgressBar from "@components/ui/ProgressBar";

const PortalLayout: FC = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <ProgressBar />
      <main className="main-container">
        <Outlet />
      </main>
    </>
  );
};

export default PortalLayout;
