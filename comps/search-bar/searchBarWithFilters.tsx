import React, { useState } from "react";
import SearchBar from "./searchBar";
import SearchBarOption, {
  ModalDisplayOptions,
  SearchBarOptionsModal,
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
          sortOptionSelected={selectedSortBy}
          updateSelectedSortOption={updateSelectedSortOption}
          layoutOptionSelected={selectedLayout}
          updateSelectedLayoutOption={updateSelectedLayoutOption}
        />
      </div>
    </div>
  );
};

export default SearchBarWithFilters;
