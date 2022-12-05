import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import { notArrayAndTruthy, stringListToArray } from "../../utils";
import SearchBar from "./searchBar";
import SearchBarOption, {
  layoutOptions,
  ModalDisplayOptions,
  SearchBarOptionsModal,
  sortOptions,
} from "./searchBarOptions";

type SearchBarWithFiltersProps = {
  inputValue: string;
  selectedFilters: string[];
  selectedSortBy: string;
  selectedLayout: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updateSelectedFilters: (value: string[]) => void;
  updateSelectedSortOption: (value: string) => void;
  updateSelectedLayoutOption: (value: string) => void;
};

const SearchBarWithFilters: React.FC<SearchBarWithFiltersProps> = ({
  inputValue,
  onInputChange,
  onSearchSubmit,
  updateSelectedFilters,
  updateSelectedSortOption,
  updateSelectedLayoutOption,
}) => {
  const query = useRouter().query;
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [displayedOptions, setDisplayedOptions] =
    useState<ModalDisplayOptions | null>(null);
  const {
    searchInputValue,
    selectedFilters,
    sortSearch,
    selectedLayout,
  } = useSearchAndViewOptions(query);

  const onCloseModal = () => {
    console.log("Closed Modal");
    setDisplayedOptions(null);
    setIsOptionsModalOpen(false);
  };

  const toggleOptionsModal = (modalOptionToDisplay: ModalDisplayOptions) => {
    setIsOptionsModalOpen(!isOptionsModalOpen);

    if (displayedOptions) {
      setDisplayedOptions(null);
    } else {
      setDisplayedOptions(modalOptionToDisplay);
    }
  };

  useEffect(() => console.log([
    "SearchBarWithFilters",
    {
      inputValue,
      selectedFilters,
      sortSearch,
      selectedLayout
    }
  ]), [])

  return (
    <div className="flex flex-col">
      <SearchBar
        inputValue={inputValue}
        onInputChange={onInputChange}
        onSearchSubmit={onSearchSubmit}
      />
      <div className="flex justify-end relative">
        <div className="flex">
          <SearchBarOption
            text="Filters []"
            clickHandler={() => toggleOptionsModal(ModalDisplayOptions.Filter)}
          />
          <SearchBarOption
            text="Sort By []"
            clickHandler={() => toggleOptionsModal(ModalDisplayOptions.SortBy)}
          />
          <SearchBarOption
            text="[ ]"
            clickHandler={() => toggleOptionsModal(ModalDisplayOptions.Layout)}
          />
        </div>
        <SearchBarOptionsModal
          isOpen={isOptionsModalOpen}
          closeModal={onCloseModal}
          optionsToDisplay={displayedOptions}
          filtersSelected={selectedFilters}
          updateSelectedFilters={updateSelectedFilters}
          sortOptionSelected={sortSearch}
          updateSelectedSortOption={updateSelectedSortOption}
          layoutOptionSelected={selectedLayout}
          updateSelectedLayoutOption={updateSelectedLayoutOption}
        />
      </div>
    </div>
  );
};

export default SearchBarWithFilters;

const useSearchAndViewOptions = (query: ParsedUrlQuery) => {
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

  useEffect(() => {
    if (search || category || filters || sortBy || layout) {
      const querySearch = notArrayAndTruthy(search, searchInputValue);
      const queryFilters = stringListToArray(filters);
      const queryCategory = stringListToArray(category);
      const querySortby = notArrayAndTruthy(sortBy, sortOptions[0]);
      const queryLayout = notArrayAndTruthy(layout, layoutOptions[0]);

      console.log([
        "query values:",
        {
          search,
          category,
          filters,
          sortBy,
          layout
        }
      ]);
      console.log([
        "parsed query values:",
        {
          querySearch,
          queryFilters,
          queryCategory,
          querySortby,
          queryLayout
        }
      ])

      setSearchInputValue(querySearch);
      setSelectedFilters([...queryCategory, ...queryFilters]);
      setSortSearch(querySortby);
      setSelectedLayout(queryLayout);
    }
  }, [query]);

  return {
    searchInputValue,
    selectedFilters,
    sortSearch,
    selectedLayout,
    // onFiltersUpdate,
    // onSortByChange,
    // onLayoutChange,
    // onSearchInputChange
  };
}