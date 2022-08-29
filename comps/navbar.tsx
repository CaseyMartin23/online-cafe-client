import React from "react";
import Link from "next/link";

const Navbar: React.FC = (props) => {
  return (
    <nav className="w-full py-2 px-4 bg-creamy-beige">
      <div className="flex flex-row">
        <h1 className="text-xl text-accent-color font-bold mr-auto my-auto">
          Online Cafe
        </h1>
        <Link href="/menu/items">
          <a>
            <div className="mx-1 px-2 py-1 rounded-md text-lg text-dark-brown">
              search
            </div>
          </a>
        </Link>
        <Link href="/login">
          <a>
            <div className="mx-1 px-2 py-1 rounded-md text-lg text-accent-color border-2 border-accent-color">
              Signup
            </div>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
