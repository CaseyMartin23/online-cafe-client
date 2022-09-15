import React from "react";
import TabContentItem from "./tabContentItem";
import TabItemBg from "../../public/tab-content-background.jpg";

const MealsTab: React.FC = () => {
  return (
    <div>
      <TabContentItem
        text="Breakfast"
        href="/menu/items?category=meals&filters=breakfast"
        bgImage={TabItemBg}
        bgImageAlt="Breakfast tab blured background image"
      />
      <TabContentItem
        text="Lunch"
        href="/menu/items?category=meals&filters=lunch"
        bgImage={TabItemBg}
        bgImageAlt="Lunch tab blured background image"
      />
      <TabContentItem
        text="Snacks & Others"
        href="/menu/items?category=meals&filters=snacks"
        bgImage={TabItemBg}
        bgImageAlt="Snacks & Others tab blured background image"
      />
    </div>
  );
};

export default MealsTab;
