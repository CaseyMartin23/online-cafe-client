import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer: React.FC = () => {
  const { pathname } = useRouter();
  const isDashBoard = pathname === "/dashboard";

  return (
    <>
      {!isDashBoard && (
        <footer className="flex flex-col pb-24 p-3 bg-dark-brown">
          <div className="flex mb-8">
            <div className="flex flex-col mr-auto">
              <h1 className="text-xl text-accent-color font-bold my-auto">
                Online Cafe
              </h1>

              <div className="flex flex-row space-x-3">
                <div className="w-8 h-8 rounded-full bg-white"></div>
                <div className="w-8 h-8 rounded-full bg-white"></div>
                <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col text-white mx-2">
                <h5 className="font-semibold">Online Cafe</h5>
                <Link href="/">
                  <a>
                    <span>Home</span>
                  </a>
                </Link>
                <Link href="/menu">
                  <a>
                    <span>Menu</span>
                  </a>
                </Link>
                <Link href="/about">
                  <a>
                    <span>About Us</span>
                  </a>
                </Link>
              </div>

              <div className="flex flex-col text-white mx-2">
                <h5 className="font-semibold">Support</h5>
                <Link href="/about">
                  <a>
                    <span>FAQ</span>
                  </a>
                </Link>
                <Link href="/about">
                  <a>
                    <span>Contact</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center pt-2 border-t border-t-white">
            <span className="text-white mt-4">
              Online Cafe - &copy;Copyright, All Rights Reserved
            </span>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
