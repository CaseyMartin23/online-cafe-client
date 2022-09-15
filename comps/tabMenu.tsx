import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type MenuTabsProps = {
  currentTab: number;
  onTabChange: (value: number) => void;
};

type MenuTabContentProps = {
  currentTab: number;
  children: React.ReactNode;
};

type MenuTabProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const MenuTab: React.FC<MenuTabProps> = ({ text, isActive, onClick }) => {
  const activeBorderClasses = isActive ? "border-b-2 border-deep-brown" : "";
  const activeTextClasses = isActive
    ? "text-deep-brown font-medium"
    : "text-slate-500";
  const elementClasses = `flex justify-center cursor-pointer mx-1 py-4 px-2 ${activeTextClasses}`;

  return (
    <div
      className={`${elementClasses} ${activeBorderClasses}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export const MenuTabs: React.FC<MenuTabsProps> = ({
  currentTab,
  onTabChange,
}) => {
  const selectedCategoryTab = useRouter().query["category"];

  const [tabs, setTabs] = useState([
    { text: "Drinks", isActive: true },
    { text: "Meals", isActive: false },
    { text: "Desserts", isActive: false },
  ]);

  const setNewCurrentTab = (newTabIndex: number) => {
    tabs[currentTab].isActive = false;
    tabs[newTabIndex].isActive = true;
    onTabChange(newTabIndex);
  };

  const onTabClick = (newIndex: number) => {
    setNewCurrentTab(newIndex);
  };

  useEffect(() => {
    if (selectedCategoryTab) {
      const selectedTabIndex = tabs.findIndex(
        ({ text }) => text.toLocaleLowerCase() === selectedCategoryTab
      );
      setNewCurrentTab(selectedTabIndex);
    }
  }, [selectedCategoryTab]);

  return (
    <div className="flex">
      <div className="flex flex-row left-4 absolute -bottom-px">
        {tabs.map(({ text, isActive }, index) => {
          return (
            <MenuTab
              key={`${text}-${index}`}
              text={text}
              isActive={isActive}
              onClick={() => onTabClick(index)}
            />
          );
        })}
      </div>
      <Link href="/menu/items">
        <a>
          <div className="flex right-4 absolute cursor-pointer py-3.5 px-2 text-accent-color">
            All Products
          </div>
        </a>
      </Link>
    </div>
  );
};

export const MenuTabContent: React.FC<MenuTabContentProps> = ({
  currentTab,
  children,
}) => {
  const arrayOfChildren = Array.isArray(children) ? children : [children];
  const currentTabContent = arrayOfChildren[currentTab];

  return <div className="h-screen px-4 pt-2">{currentTabContent}</div>;
};
