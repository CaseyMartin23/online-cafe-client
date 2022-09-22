import React from "react";
import { AdminMenuItems } from "../../../pages/dashboard";
import Orders from "./orders";
import Products from "./products/";

type ContentDisplayProps = {
  currentMenuItem: AdminMenuItems;
};

const ContentDisplay: React.FC<ContentDisplayProps> = ({ currentMenuItem }) => {
  const menuItemContent = [
    { value: AdminMenuItems.Orders, Content: Orders },
    { value: AdminMenuItems.Products, Content: Products },
  ];

  return (
    <div className="flex-grow bg-slate-200">
      {menuItemContent.map(({ value, Content }, index) => {
        if (value === currentMenuItem) {
          return <Content key={`${value}-${index}`} />;
        }
      })}
    </div>
  );
};

export default ContentDisplay;
