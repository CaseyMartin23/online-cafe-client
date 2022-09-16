import React from "react";
import Link from "next/link";
import { useAuthState } from "../authContext";

const SignUpBtn: React.FC = () => {
  return (
    <Link href="/register">
      <a>
        <div className="px-2 py-2 rounded-md text-lg text-white bg-accent-color">
          [] Sign up
        </div>
      </a>
    </Link>
  );
};

const ProfileBtn: React.FC = () => {
  return (
    <Link href="/profile">
      <a>
        <div className="px-2 py-2 rounded-md text-lg text-deep-brown">
          [] Profile
        </div>
      </a>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const { authenticated } = useAuthState();

  return (
    <nav className="w-full py-2 px-4 bg-creamy-beige">
      <div className="flex flex-row">
        <h1 className="text-xl text-accent-color font-bold mr-auto my-auto">
          Online Cafe
        </h1>
        {authenticated ? <ProfileBtn /> : <SignUpBtn />}
      </div>
    </nav>
  );
};

export default Navbar;
