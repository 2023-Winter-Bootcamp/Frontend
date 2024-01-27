import React, { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div style={{ margin: "0px", paddingTop: "0px" }}>{children}</div>
    </div>
  );
};

export default Layout;
