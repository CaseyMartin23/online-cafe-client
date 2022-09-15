import React from "react";

import Navbar from "./navbar";
import MobileNavbar from "./mobileNavbar";
import Footer from "./footer";
import { useRouter } from "next/router";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();

  const checkPathToDisplay = () => {
    const pathNotToDisplay = ["/login", "/register", "/forgot-password"];
    let shouldDisplay = false;
    shouldDisplay = !pathNotToDisplay.includes(pathname);
    return shouldDisplay;
  };

  return (
    <div className="h-screen flex flex-col">
      {checkPathToDisplay() && <Navbar />}
      {children}
      {checkPathToDisplay() && <MobileNavbar />}
      {checkPathToDisplay() && <Footer />}
    </div>
  );
};

export default Layout;
