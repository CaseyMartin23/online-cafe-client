import React from "react";
import { useCart } from "../../hooks/useCart";

import { ProductType } from "../../pages/menu/items/[id]";

type ItemDisplayProps = {
  item: ProductType;
};

const ItemDisplay: React.FC<ItemDisplayProps> = ({ item }) => {
  const { addCartItem } = useCart();
  const { id, name, price, description, tags } = item;

  return (
    <div className="flex flex-col mb-3">
      <div className="flex flex-row">
        <h1 className="text-lg font-medium mr-auto">{name}</h1>
        <span className="text-lg font-bold">&#36; {price}</span>
      </div>
      <div>
        {tags && tags.map((tag, index, array) => {
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
          <button onClick={() => addCartItem(id)} className="px-3 py-2 text-white font-medium bg-accent-color rounded">
            Add to Cart
          </button>
      </div>

      <div className="mt-2">
        <p>
          {description}
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
