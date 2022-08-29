import React from "react";

type ItemImageDisplayProps = {
  images: string[];
};

const ItemImageDisplay: React.FC<ItemImageDisplayProps> = ({ images }) => {
  return (
    <div>
      <div className="w-full h-96 bg-cyan-500"></div>
      <div className="flex flex-row py-2 justify-center">
        <div className="w-2 h-2 mx-1 bg-blue-500 rounded-full"></div>
        <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
        <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
        <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
        <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default ItemImageDisplay;
