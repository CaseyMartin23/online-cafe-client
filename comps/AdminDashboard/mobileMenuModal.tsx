import React from "react";

type MobileMenuModalProps = {
  isOpen: boolean;
};

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="absolute w-full h-full bg-orange-500">
          <div>Menu Item</div>
          <div>Menu Item</div>
          <div>Menu Item</div>
        </div>
      )}
    </>
  );
};

export default MobileMenuModal;
