import React from "react";
import { AdminMenuItems } from "../../pages/dashboard";

type MobileMenuBarProps = {
  onOpen: () => void;
  currentMenuItem: AdminMenuItems;
};

const MobileMenuBar: React.FC<MobileMenuBarProps> = ({
  onOpen,
  currentMenuItem,
}) => {
  const getDisplayTitle = () => {
    const titleArray = currentMenuItem.split("").map((letter, index) => {
      if (index > 0) return letter.toLocaleLowerCase();
      return letter;
    });
    return titleArray.join("");
  };

  return (
    <div className="flex flex-row border-b md:hidden">
      <div className="py-2 px-4 border-r" onClick={onOpen}>
        Menu
      </div>
      <div className="flex-grow py-2 px-4">
        <span>{getDisplayTitle()}</span>
      </div>
    </div>
  );
};

export default MobileMenuBar;
