import React from "react";
import { useRouter } from "next/router";
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
  const { push } = useRouter();

  const onMenuItemClick = (itemType: AdminMenuItems) => {
    onSelected(itemType);
    push(`/dashboard?show=${itemType.toLocaleLowerCase()}&content=list`);
  };

  return (
    <>
      {isOpen && (
        <div className="flex flex-col absolute w-full h-full p-4 bg-white">
          <MenuModalItem
            clickHandler={() => onMenuItemClick(AdminMenuItems.Orders)}
            text="Orders"
            icon="[X]"
          />
          <MenuModalItem
            clickHandler={() => onMenuItemClick(AdminMenuItems.Products)}
            text="Products"
            icon="[X]"
          />
        </div>
      )}
    </>
  );
};

export default MobileMenuModal;
