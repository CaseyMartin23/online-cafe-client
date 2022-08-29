import React from "react";
import TabContentItem from "./tabContentItem";
import TabItemBg from "../../public/tab-content-background.jpg";

const DessertsTab: React.FC = (props) => {
  return (
    <div>
      <TabContentItem
        text="Cakes"
        href="/menu/items?category=desserts&filters=cakes"
        bgImage={TabItemBg}
        bgImageAlt="Cakes tab blured background image"
      />
      <TabContentItem
        text="Pie's & Tarts"
        href="/menu/items?category=desserts&filters=pies-tarts"
        bgImage={TabItemBg}
        bgImageAlt="Pies & Tarts tab blured background image"
      />
      <TabContentItem
        text="Cookies & Muffins"
        href="/menu/items?category=drinks&filters=cookies-muffins"
        bgImage={TabItemBg}
        bgImageAlt="Cookies & Muffins tab blured background image"
      />
    </div>
  );
};

export default DessertsTab;
