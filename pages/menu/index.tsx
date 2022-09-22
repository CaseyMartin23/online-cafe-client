import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import PageLayout from "../../comps/pageLayout";
import SearchBarWithFilters from "../../comps/search-bar/searchBarWithFilters";
import {
  sortOptions,
  layoutOptions,
} from "../../comps/search-bar/searchBarOptions";
import { MenuTabs, MenuTabContent } from "../../comps/tabMenu";
import MealsTab from "../../comps/menu-tab-content/meals";
import DrinksTab from "../../comps/menu-tab-content/drinks";
import DessertsTab from "../../comps/menu-tab-content/desserts";

const MenuPage: NextPage = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
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
    router.push(`/menu/items?search=${searchInputValue}`);
  };

  const onMenuTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <PageLayout>
      <Head>
        <title>Online Cafe | Menu</title>
        <meta name="description" content="An online cafe store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="p-4 border-b-2 h-44 relative">
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
          <MenuTabs currentTab={selectedTab} onTabChange={onMenuTabChange} />
        </div>
        <div>
          <MenuTabContent currentTab={selectedTab}>
            <DrinksTab />
            <MealsTab />
            <DessertsTab />
          </MenuTabContent>
        </div>
      </main>
    </PageLayout>
  );
};

export default MenuPage;
