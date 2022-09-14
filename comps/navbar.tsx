import React from "react";
import Link from "next/link";

const Navbar: React.FC = (props) => {
  return (
    <nav className="w-full py-2 px-4 bg-creamy-beige">
      <div className="flex flex-row">
        <h1 className="text-xl text-accent-color font-bold mr-auto my-auto">
          Online Cafe
        </h1>
        <Link href="/login">
          <a>
            <div className="px-2 py-2 rounded-md text-lg text-white bg-accent-color">
              [] Sign up
            </div>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
