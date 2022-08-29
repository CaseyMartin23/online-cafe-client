import Link from "next/link";
import React from "react";

type ItemCardProps = {
  name: string;
  category: string;
  price: string;
  isNew?: boolean;
  itemId: string;
};

const NewItemLabel: React.FC<{ display: boolean }> = ({ display }) => {
  return display ? (
    <div className="flex w-full justify-end">
      <div className="w-fit p-1 rounded text-white bg-accent-color">new</div>
    </div>
  ) : null;
};

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  category,
  price,
  isNew = false,
  itemId,
}) => {
  return (
    <Link href={`/menu/items/${itemId}`}>
      <a>
        <div className="mx-2 my-2">
          <div className="w-44 h-60 bg-cyan-600 rounded-lg">
            <NewItemLabel display={isNew} />
          </div>
          <h3 className="mt-3 text-sm">{name}</h3>
          <h3 className="text-sm">{category}</h3>
          <p className="mt-1 text-lg font-bold">{price}</p>
        </div>
      </a>
    </Link>
  );
};

export default ItemCard;
