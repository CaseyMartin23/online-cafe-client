import React from "react";
import Link from "next/link";

type NavbarItemProps = {
  text: string;
  // change below to icon definition
  icon: any;
};

const NavbarItem: React.FC<NavbarItemProps> = ({ text, icon }) => {
  const navigateTo = text.toLowerCase();

  return (
    <Link href={navigateTo == "home" ? "/" : `/${navigateTo}`}>
      <a>
        <div className="flex flex-col items-center mx-6">
          <div className="w-8 h-8 bg-slate-500 rounded-full"></div>
          <span>{text}</span>
        </div>
      </a>
    </Link>
  );
};

const MobileNavbar: React.FC = (props) => {
  return (
    <div className="left-0 bottom-0 fixed w-screen bg-slate-200 p-2">
      <div className="flex flex-row justify-center">
        <NavbarItem text="Home" icon={""} />
        <NavbarItem text="Menu" icon={""} />
        <NavbarItem text="Cart" icon={""} />
        <NavbarItem text="Profile" icon={""} />
      </div>
    </div>
  );
};

export default MobileNavbar;