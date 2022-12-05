import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import PageLayout from "../../../comps/pageLayout";
import SearchBarWithFilters from "../../../comps/search-bar/searchBarWithFilters";
import {
  sortOptions,
  layoutOptions,
} from "../../../comps/search-bar/searchBarOptions";
import ItemCard from "../../../comps/itemCard";
import PaginationTabs from "../../../comps/paginationTabs";
import { stringListToArray, notArrayAndTruthy } from "../../../utils";
import { useAuthState } from "../../../authContext";
import { ProductType } from "./[id]";

const MenuItems: NextPage = () => {
  const { user, authenticated } = useAuthState();
  const query = useRouter().query;
  const accessToken = user?.accessToken ? user?.accessToken : "";
  const products = useRetrieveProducts(accessToken, 1);
  const { search, category, filters, sortBy, layout } = query;
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortSearch, setSortSearch] = useState<string>(sortOptions[0]);
  const [selectedLayout, setSelectedLayout] = useState<string>(
    layoutOptions[0]
  );

  const onFiltersUpdate = (newFilters: string[]) => {
    setSelectedFilters(newFilters);
  };

  const onSortByChange = (newSortBy: string) => {
    setSortSearch(newSortBy);
  };

  const onLayoutChange = (newLayout: string) => {
    setSelectedLayout(newLayout);
  };

  const onSearchInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(target.value);
  };

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("searchInputValue:", searchInputValue);
  };

  useEffect(() => {
    const querySearch = notArrayAndTruthy(search, searchInputValue);
    const queryFilters = stringListToArray(filters);
    const queryCategory = stringListToArray(category);
    const querySortby = notArrayAndTruthy(sortBy, sortOptions[0]);
    const queryLayout = notArrayAndTruthy(layout, layoutOptions[0]);

    setSearchInputValue(querySearch);
    setSelectedFilters([...queryCategory, ...queryFilters]);
    setSortSearch(querySortby);
    setSelectedLayout(queryLayout);
  }, [query]);

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Menu Items</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="p-4 pb-0 border-b-2 relative">
          <SearchBarWithFilters
            inputValue={searchInputValue}
            onInputChange={onSearchInputChange}
            onSearchSubmit={onSearchSubmit}
            selectedFilters={selectedFilters}
            selectedSortBy={sortSearch}
            selectedLayout={selectedLayout}
            updateSelectedFilters={onFiltersUpdate}
            updateSelectedSortOption={onSortByChange}
            updateSelectedLayoutOption={onLayoutChange}
          />
        </div>
        <div className="flex flex-row flex-wrap p-4 pt-4 h-full">
        {!authenticated && (
          <div className="flex flex-row items-center justify-center w-full">
            <div>Loading...</div>
          </div>
        )}
          {authenticated && products && products.map(({ id, name, category, price }) => (
            <ItemCard
              key={`${id}-${name}`}
              name={name}
              category={category}
              price={`$${price}`}
              itemId={id}
            />
          ))}
        </div>
        <div>
          <PaginationTabs />
        </div>
      </main>
    </PageLayout>
  );
};

export default MenuItems;


const useRetrieveProducts = (accessToken: string, pageNumber: number = 1) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  
  const getProducts = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}products/page?index=${pageNumber}`;
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

      setProducts(productsResponse.data.items);
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    if(accessToken) getProducts();
  }, [accessToken]);

  return products;
}