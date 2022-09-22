import React from "react";
import { AdminMenuItems } from "../../pages/dashboard";

type MobileMenuModalProps = {
  isOpen: boolean;
  onSelected: (value: AdminMenuItems) => void;
};

type MenuModalItemProps = {
  text: string;
  icon: string;
  clickHandler: () => void;
};

const MenuModalItem: React.FC<MenuModalItemProps> = ({
  text,
  icon,
  clickHandler,
}) => {
  return (
    <div
      onClick={clickHandler}
      className="flex flex-row p-5 mb-4 rounded bg-deep-brown text-white"
    >
      <div className="mr-4">{icon}</div>
      <div>{text}</div>
    </div>
  );
};

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  isOpen,
  onSelected,
}) => {
  return (
    <>
      {isOpen && (
        <div className="flex flex-col absolute w-full h-full p-4 bg-white">
          <MenuModalItem
            clickHandler={() => onSelected(AdminMenuItems.Orders)}
            text="Orders"
            icon="[X]"
          />
          <MenuModalItem
            clickHandler={() => onSelected(AdminMenuItems.Products)}
            text="Products"
            icon="[X]"
          />
        </div>
      )}
    </>
  );
};

export default MobileMenuModal;
