import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../comps/pageLayout";
import Link from "next/link";

const CartItem: React.FC = () => {
  return (
    <div className="flex flex-row my-2 p-3 rounded border">
      <div className="w-28 h-20 mr-2 bg-cyan-400 rounded"></div>
      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-row">
          <div className="flex flex-col mr-auto">
            <span>Item name</span>
            <span>Item category</span>
          </div>
          <button className="flex flex-row">
            <div className="w-1 h-1 p-3 rounded bg-slate-400"></div>
          </button>
        </div>
        <div className="flex flex-row items-end">
          <span className="mr-auto text-accent-color font-bold">
            &#36; 99.99
          </span>
          <div className="flex flex-row border rounded">
            <button className="border-r px-3"> - </button>
            <div className="text-sm px-3"> 1 </div>
            <button className="border-l px-3"> + </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage: NextPage = (props) => {
  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Cart</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="my-10 mx-8">
          <h1 className="text-lg text-accent-color font-bold">Your Cart</h1>
          <div className="h-96 overflow-x-auto">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="mb-6 mt-10 border-y py-4">
            <div className="mb-3 ml-2">
              <div className="flex flex-row">
                <span className="my-2 mr-auto text-slate-500">Items (3)</span>
                <span className="text-accent-color">&#36; 99.99</span>
              </div>
              <div className="flex flex-row">
                <span className="my-2 mr-auto text-slate-500">Delivery</span>
                <span className="text-accent-color">&#36; 99.99</span>
              </div>
            </div>
            <div className="flex flex-row mr-2">
              <span className="my-2 mr-auto font-bold">Total</span>
              <span className="text-green-600 font-bold">&#36; 99.99</span>
            </div>
          </div>
          <Link href="/checkout">
            <a>
              <div className="w-full text-center text-white p-3 rounded bg-accent-color">
                Check out
              </div>
            </a>
          </Link>
        </div>
      </main>
    </PageLayout>
  );
};

export default CartPage;
