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
import { useAuthState } from "../../../authContext";

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  tags: string[];
  category: string;
  dateCreated: string;
  dateUpdated: string;
};

const MenuItemPage: NextPage = () => {
  const { user, authenticated } = useAuthState()
  const accessToken = user?.accessToken || "";
  const product = useRetrieveProduct(accessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [similarItems, setSimilarItems] = useState<ProductType[]>();
  const [alsoLikeditems, setAlsoLikedItems] = useState<ProductType[]>();

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | {product?.name}</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-grow">
        <ItemNavbar />
        {!authenticated && (
          <div className="flex flex-row items-center justify-center h-full">
            <div>Loading...</div>
          </div>
        )}
        {authenticated && product && (
          <>
            <ItemImageDisplay images={product?.images} />
            <div className="mx-4 mb-3">
            <ItemDisplay item={product} />
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


const useRetrieveProduct = (accessToken: string) => {
  const id = useRouter().query.id;
  const [product, setProduct] = useState<ProductType>();

  const getProduct = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}products/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      const productsResponse = await response.json();

      if (productsResponse.statusCode && productsResponse.message) {
        throw new Error(productsResponse.message);
      }

      if (!productsResponse.success) {
        throw new Error(productsResponse.error.message);
      }

      const [fetchedProduct] = productsResponse.data.items
      console.log({ product: fetchedProduct })
      setProduct(fetchedProduct);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (accessToken && id) getProduct();
  }, [accessToken])

  return product;
}