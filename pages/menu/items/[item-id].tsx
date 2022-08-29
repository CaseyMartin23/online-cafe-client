import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import PageLayout from "../../../comps/pageLayout";
import ItemNavbar from "../../../comps/itemNavbar";
import { notArrayAndTruthy } from "../../../utils";

type ItemType = {
  id: string;
  name: string;
  description: string;
  currentPrice: string;
  previousPrice: string;
  rating: number;
  category: string;
  tags: string[];
};

const MenuItemPage: NextPage = () => {
  const itemId = useRouter().query["item-id"];
  const [item, setItem] = useState<ItemType>();
  const [similarItems, setSimilarItems] = useState<ItemType[]>();
  const [alsoLikeditems, setAlsoLikedItems] = useState<ItemType[]>();

  useEffect(() => {
    // get full item by ID
    setItem({
      id: notArrayAndTruthy(itemId, ""),
      name: "Cheese Burger",
      description: "Burger description",
      currentPrice: "3.00",
      previousPrice: "5.00",
      rating: 4.9,
      category: "Burgers",
      tags: ["Meals", "Burgers"],
    });
  }, [itemId]);

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | {item?.name}</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ItemNavbar />
        <div className="w-full h-96 bg-cyan-500"></div>
        <div className="flex flex-row py-2 justify-center">
          <div className="w-2 h-2 mx-1 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
          <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
          <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
          <div className="w-2 h-2 mx-1 bg-slate-500 rounded-full"></div>
        </div>
        <div className="mx-4 mb-3">
          <div className="flex flex-col">
            <h1>{item?.name}</h1>
            <div>{item?.category}</div>
            <div className="flex flex-row space-x-2">
              <span className="line-through text-slate-500">
                &#36; {item?.previousPrice}
              </span>
              <span>&#36; {item?.currentPrice}</span>
              <span>{"(% Off)"}</span>
            </div>

            <div>
              <p>Details</p>
            </div>
          </div>
          <div>Similar Products</div>
        </div>
      </main>
    </PageLayout>
  );
};

export default MenuItemPage;
