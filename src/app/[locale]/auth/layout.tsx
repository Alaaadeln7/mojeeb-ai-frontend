import React, { ReactNode } from "react";
import Head from "next/head";
import AuthHeader from "./AuthHeader";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({ children, description = "auth pages" }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthHeader />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
