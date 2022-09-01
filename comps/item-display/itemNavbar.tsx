import Link from "next/link";
import React from "react";

const ItemNavbar: React.FC = (props) => {
  return (
    <div className="flex flex-row ">
      <Link href="/menu/items">
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
      <div className="flex flex-row w-full p-2 justify-end">
        <div className="w-8 h-8 mx-1 bg-slate-500 rounded-full"></div>
        <div className="w-8 h-8 mx-1 bg-slate-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default ItemNavbar;
