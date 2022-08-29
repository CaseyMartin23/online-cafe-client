import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import PageLayout from "../../../comps/pageLayout";
import SearchBar from "../../../comps/search-bar/searchBar";
import {
  sortOptions,
  layoutOptions,
} from "../../../comps/search-bar/searchBarOptions";
import ItemCard from "../../../comps/itemCard";
import PaginationTabs from "../../../comps/paginationTabs";
import { stringListToArray, notArrayAndTruthy } from "../../../utils";

const MenuItems: NextPage = (props) => {
  const query = useRouter().query;
  const { search, category, filters, sortBy, layout } = query;
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortSearch, setSortSearch] = useState<string>(sortOptions[0]);
  const [selectedLayout, setSelectedLayout] = useState<string>(
    layoutOptions[0]
  );

  console.log("query:", query);
  console.log("searchInputValue:", searchInputValue);
  console.log("selectedFilters:", selectedFilters);
  console.log("sortSearch:", sortSearch);
  console.log("selectedLayout:", selectedLayout);

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
          <SearchBar
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
        <div className="flex flex-row flex-wrap p-4 pt-4">
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          {/* <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          />
          <ItemCard
            name="Item 1"
            category="Cold Drink"
            price="$25"
            itemId="1"
          /> */}
        </div>
        <div>
          <PaginationTabs />
        </div>
      </main>
    </PageLayout>
  );
};

export default MenuItems;
