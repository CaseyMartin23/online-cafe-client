import React, { useState } from "react";
import SearchBarOption, {
  ModalDisplayOptions,
  SearchBarOptionsModal,
} from "./searchBarOptions";

type SearchBarProps = {
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

const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  selectedFilters,
  selectedSortBy,
  selectedLayout,
  onInputChange,
  onSearchSubmit,
  updateSelectedFilters,
  updateSelectedSortOption,
  updateSelectedLayoutOption,
}) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [displayedOptions, setDisplayedOptions] =
    useState<ModalDisplayOptions | null>(null);

  const toggleOptionsModal = (modalOptionToDisplay: ModalDisplayOptions) => {
    setIsOptionsModalOpen(!isOptionsModalOpen);

    if (displayedOptions) {
      setDisplayedOptions(null);
    } else {
      setDisplayedOptions(modalOptionToDisplay);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <form className="flex flex-row w-full" onSubmit={onSearchSubmit}>
          <button type="submit" className="p-3 pr-1 rounded-l-xl bg-slate-200">
            icon
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={onInputChange}
            className="w-full pl-2 bg-slate-200 rounded-r-xl focus:outline-none"
          />
        </form>
      </div>
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
          optionsToDisplay={displayedOptions}
          filtersSelected={selectedFilters}
          updateSelectedFilters={updateSelectedFilters}
          sortOptionSelected={selectedSortBy}
          updateSelectedSortOption={updateSelectedSortOption}
          layoutOptionSelected={selectedLayout}
          updateSelectedLayoutOption={updateSelectedLayoutOption}
        />
      </div>
    </div>
  );
};

export default SearchBar;
