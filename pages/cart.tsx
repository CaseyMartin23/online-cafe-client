import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../comps/pageLayout";
import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { ProductType } from "./menu/items/[id]";

type CartItemType = {
  id: string;
  product: ProductType;
  name: string;
  quantity: number;
  price: string;
  subTotalPrice: string;
}

export type CartType = {
  id: string
  cartItems: CartItemType[];
  totalPrice: string;
}

type CartItemPropsType = {
  name: string;
  category: string;
  price: string;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  removeItem: () => void;
};

export const CartNotificationButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  return (
    <Link href="/cart">
      <a>
        <div className="w-8 h-8 mx-1 bg-orange-400 rounded-full"></div>
      </a>
    </Link>
  );
}

const CartItem: React.FC<CartItemPropsType> = ({
  name,
  category,
  price,
  quantity,
  incrementQuantity,
  decrementQuantity,
  removeItem,
}) => {
  const flexRowItemsCenter = "flex flex-row items-center";
  return (
    <div className="flex flex-row my-2 p-3 rounded border">
      <div className="w-28 h-20 mr-2 bg-cyan-400 rounded"></div>
      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-row">
          <div className="flex flex-col mr-auto">
            <span>{name}</span>
            <span>{category}</span>
          </div>
          <button onClick={removeItem} className="flex flex-row">
            <div className="w-1 h-1 p-3 rounded bg-red-600"></div>
          </button>
        </div>
        <div className="flex flex-row items-end">
          <span className="mr-auto text-accent-color font-bold">
            &#36; {price}
          </span>
          <div className="flex flex-row border rounded">
            <button
              className={`${flexRowItemsCenter} border-r px-3 text-red-500 font-bold`}
              onClick={decrementQuantity}
            >
              -
            </button>
            <div className={`${flexRowItemsCenter} text-sm px-3`}>{quantity}</div>
            <button
              className={`${flexRowItemsCenter} border-l px-3 text-green-600 font-bold`}
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage: NextPage = () => {
  const {
    cart,
    isLoading,
    incrementItemQuantity,
    decrementItemQuantity,
    removeCartItem,
    clearCart,
  } = useCart();

  const itemCount = cart?.cartItems.reduce((acc, curr) => {
    acc += curr.quantity;
    return acc;
  }, 0);

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Cart</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow mt-8 mb-10 mx-4">
        <h1 className="mb-4 ml-5 text-lg text-accent-color font-bold">Your Cart</h1>
        <div className="h-full">
          {isLoading && !cart && <div>Loading...</div>}
          {!isLoading && cart && (
            <>
              <div className="flex flex-row justify-end mb-4">
                <button onClick={clearCart} className="p-2 rounded text-white bg-red-600">
                  Clear all
                </button>
              </div>
              <div className="h-96 overflow-x-auto">
                {cart.cartItems && cart.cartItems.map(({ id, product, quantity, subTotalPrice }) => (
                  <CartItem
                    key={`${product.id}-${product.name}`}
                    name={product.name}
                    category={product.category}
                    price={subTotalPrice}
                    quantity={quantity}
                    incrementQuantity={() => incrementItemQuantity(id)}
                    decrementQuantity={() => decrementItemQuantity(id)}
                    removeItem={() => removeCartItem(id)}
                  />
                ))}
              </div>
              <div className="mb-6 mt-10 border-y py-4">
                <div className="flex flex-row">
                  <span className="my-2 mr-auto text-slate-500">Items</span>
                  <span className="text-accent-color">{itemCount}</span>
                </div>
                <div className="flex flex-row">
                  <span className="my-2 mr-auto font-bold">Subtotal</span>
                  <span className="text-green-600 font-bold">&#36; {cart.totalPrice}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <Link href="/checkout">
          <a>
            <div className="w-full text-center text-white p-3 rounded bg-accent-color">
              Check out
            </div>
          </a>
        </Link>
      </main>
    </PageLayout>
  );
};

export default CartPage;