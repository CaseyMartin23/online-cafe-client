import React from "react";
import TabContentItem from "./tabContentItem";
import TabItemBg from "../../public/tab-content-background.jpg";

const DrinksTab: React.FC = () => {
  return (
    <div>
      <TabContentItem
        text="Cold Drinks"
        href="/menu/items?category=drinks&filters=cold-drinks"
        bgImage={TabItemBg}
        bgImageAlt="Cold drinks tab blured background image"
      />
      <TabContentItem
        text="Hot Drinks"
        href="/menu/items?category=drinks&filters=hot-drinks"
        bgImage={TabItemBg}
        bgImageAlt="Hot drinks tab blured background image"
      />
      <TabContentItem
        text="Alcoholic Drinks"
        href="/menu/items?category=drinks&filters=alcoholic-drinks"
        bgImage={TabItemBg}
        bgImageAlt="Alcoholic drinks tab blured background image"
      />
    </div>
  );
};

export default DrinksTab;
