import React from "react";

import Navbar from "./navbar";
import MobileNavbar from "./mobileNavbar";
import Footer from "./footer";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {children}
      <MobileNavbar />
      <Footer />
    </div>
  );
};

export default Layout;
