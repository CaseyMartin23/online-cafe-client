import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import PageLayout from "../../../comps/pageLayout";
import ItemNavbar from "../../../comps/item-display/itemNavbar";
import ItemDisplay from "../../../comps/item-display/itemDisplay";
import { notArrayAndTruthy } from "../../../utils";
import ItemImageDisplay from "../../../comps/item-display/itemImageDisplay";
import ItemCarousel from "../../../comps/itemCarousel";
import ItemCard from "../../../comps/itemCard";

export type ItemType = {
  id: string;
  name: string;
  details: string;
  displayPrice: string;
  rating: number;
  category: string;
  tags: string[];
  images: string[];
};

const MenuItemPage: NextPage = () => {
  const itemId = useRouter().query["item-id"];
  const [item, setItem] = useState<ItemType>();
  const [isLoading, setIsLoading] = useState(false);
  const [similarItems, setSimilarItems] = useState<ItemType[]>();
  const [alsoLikeditems, setAlsoLikedItems] = useState<ItemType[]>();

  useEffect(() => {
    // get full item by ID
    setIsLoading(true);
    setItem({
      id: notArrayAndTruthy(itemId, ""),
      name: "Cheese Burger",
      details: "Burger description",
      displayPrice: "3.00",
      rating: 4.9,
      category: "Burgers",
      tags: ["Meals", "Burgers"],
      images: [],
    });
    setIsLoading(false);
  }, [itemId]);

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | {item?.name}</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isLoading && !item && <div>Loading...</div>}
        {!isLoading && item && (
          <>
            <ItemNavbar />
            <ItemImageDisplay images={item.images} />
            <div className="mx-4 mb-3">
              <ItemDisplay item={item} />
              <div>
                <div>
                  <h5>Similar Products</h5>
                  <ItemCarousel>
                    <ItemCard
                      name="Item name 1"
                      category="Cold Drink"
                      price="$48"
                      itemId="1"
                    />
                    <ItemCard
                      name="Item name 2"
                      category="Hot Drink"
                      price="$48"
                      itemId="2"
                    />
                    <ItemCard
                      name="Item name 3"
                      category="Alcoholic Drink"
                      price="$48"
                      itemId="3"
                    />
                    <ItemCard
                      name="Item name 4"
                      category="Breakfast"
                      price="$48"
                      itemId="1"
                    />
                    <ItemCard
                      name="Item name 5"
                      category="Lunch"
                      price="$48"
                      itemId="1"
                    />
                  </ItemCarousel>
                </div>

                <div>
                  <h5>Customers also like</h5>
                  <ItemCarousel>
                    <ItemCard
                      name="Item name 1"
                      category="Cold Drink"
                      price="$48"
                      itemId="1"
                    />
                    <ItemCard
                      name="Item name 2"
                      category="Hot Drink"
                      price="$48"
                      itemId="2"
                    />
                    <ItemCard
                      name="Item name 3"
                      category="Alcoholic Drink"
                      price="$48"
                      itemId="3"
                    />
                    <ItemCard
                      name="Item name 4"
                      category="Breakfast"
                      price="$48"
                      itemId="1"
                    />
                    <ItemCard
                      name="Item name 5"
                      category="Lunch"
                      price="$48"
                      itemId="1"
                    />
                  </ItemCarousel>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </PageLayout>
  );
};

export default MenuItemPage;
