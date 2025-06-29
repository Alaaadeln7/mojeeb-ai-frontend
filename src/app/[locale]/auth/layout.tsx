import React, { ReactNode } from "react";
import AuthHeader from "./AuthHeader";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
