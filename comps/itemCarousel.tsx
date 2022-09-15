import React from "react";

const ItemCarousel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex flex-row overflow-x-auto mt-2">{children}</div>;
};

export default ItemCarousel;
