import Link from "next/link";
import React from "react";

import { ItemType } from "../../pages/menu/items/[item-id]";

type ItemDisplayProps = {
  item: ItemType;
};

const ItemDisplay: React.FC<ItemDisplayProps> = ({ item }) => {
  const { id, name, displayPrice, details, tags } = item;

  return (
    <div className="flex flex-col mb-3">
      <div className="flex flex-row">
        <h1 className="text-lg font-medium mr-auto">{name}</h1>
        <span className="text-lg font-bold">&#36; {displayPrice}</span>
      </div>
      <div>
        {tags.map((tag, index, array) => {
          const isLastTag = array.length - 1 === index;
          return (
            <span className="font-light" key={`${index}-${tag}`}>
              {tag}
              {!isLastTag && " | "}
            </span>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Link href="/cart">
          <a className="px-3 py-2 text-white font-medium bg-accent-color rounded">
            Add to Cart
          </a>
        </Link>
      </div>

      <div className="mt-2">
        <p>
          {details}
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sunt
          dolor dolores ipsum itaque suscipit illo optio similique et quis
          soluta minima perferendis quas accusantium, facilis necessitatibus
          vero ex ut!
        </p>
      </div>
    </div>
  );
};

export default ItemDisplay;
