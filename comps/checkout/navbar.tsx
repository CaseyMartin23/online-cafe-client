import React from "react";
import Link from "next/link";

const CheckoutNavbar: React.FC = (props) => {
  return (
    <div className="flex flex-row border-b">
      <Link href="/cart">
        <a>
          <div className="p-3">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CheckoutNavbar;
