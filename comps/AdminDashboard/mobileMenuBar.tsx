import React from "react";

type MobileMenuBarProps = {
  onOpen: () => void;
};

const MobileMenuBar: React.FC<MobileMenuBarProps> = ({ onOpen }) => {
  return (
    <div className="flex flex-row bg-blue-600 md:hidden">
      <div onClick={onOpen}>Menu</div>
      <div className="flex-grow bg-red-600">Dashboard</div>
    </div>
  );
};

export default MobileMenuBar;
