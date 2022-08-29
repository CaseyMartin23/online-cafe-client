import React from "react";
import { useRouter } from "next/router";

export enum ModalDisplayOptions {
  Filter = "Filter",
  SortBy = "Sort By",
  Layout = "Layout",
}

type SearchBarOptionProps = {
  text: string;
  clickHandler: () => void;
};

type SearchBarOptionsModalProps = {
  isOpen: boolean;
  optionsToDisplay: ModalDisplayOptions | null;
  filtersSelected: string[];
  updateSelectedFilters: (value: string[]) => void;
  sortOptionSelected: string;
  updateSelectedSortOption: (value: string) => void;
  layoutOptionSelected: string;
  updateSelectedLayoutOption: (value: string) => void;
};

type FilterOptionsProps = {
  filtersSelected: string[];
  updateSelectedFilters: (value: string[]) => void;
  onSave: (value: string[]) => void;
};

type OptionsProps = {
  availableOptions: string[];
  optionSelected: string;
  onSelect: (value: string) => void;
};

type ModalOptionProps = {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
};

const filters = [
  "Burgers",
  "Soda",
  "Fries",
  "Pizza",
  "Pies",
  "Cakes",
  "Sandwiches",
];
export const sortOptions = [
  "Popularity",
  "Price - Low to High",
  "Price - High to Low",
  "Newest",
];
export const layoutOptions = ["Grid", "Column"];

const checkIfFilterSelected = (
  value: string,
  comparedValue: string[] | string
) => {
  if (Array.isArray(comparedValue)) return comparedValue.includes(value);
  return comparedValue === value;
};

const ModalOption: React.FC<ModalOptionProps> = ({
  text,
  isSelected,
  onSelect,
}) => {
  const modalOptionSelectedClasses = isSelected ? "bg-blue-600" : "bg-blue-400";
  const modalOptionClasses = `p-2 m-1 w-full ${modalOptionSelectedClasses} text-white rounded`;

  return (
    <div className={modalOptionClasses} onClick={onSelect}>
      {text}
    </div>
  );
};

const ModalFilterOption: React.FC<ModalOptionProps> = ({
  text,
  isSelected,
  onSelect,
}) => {
  const selectionIcon = isSelected ? "[ X ] " : "[  ] ";
  const seletedOptionClasses = isSelected ? "bg-blue-600" : "bg-blue-400";
  const modalFilterOptionClasses = `p-2 m-1 ${seletedOptionClasses} text-white rounded`;

  return (
    <div className={modalFilterOptionClasses} onClick={onSelect}>
      {selectionIcon}
      {text}
    </div>
  );
};

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filtersSelected,
  updateSelectedFilters,
  onSave,
}) => {
  const handleFilterSelection = (selectedFilter: string) => {
    const hasFilterSaved = checkIfFilterSelected(
      selectedFilter,
      filtersSelected
    );
    if (hasFilterSaved) {
      const filterIndex = filtersSelected.findIndex(
        (filter) => filter === selectedFilter
      );
      const removedSelectedFilter = filtersSelected.filter(
        (filter) => filter !== filtersSelected[filterIndex]
      );

      updateSelectedFilters(removedSelectedFilter);
    } else {
      updateSelectedFilters([...filtersSelected, selectedFilter]);
    }
  };

  const onFiltersSave = () => {
    onSave(filtersSelected);
  };

  const onFiltersClear = () => {
    updateSelectedFilters([]);
  };

  return (
    <>
      <OptionsWrapper>
        {filters.map((filter, index) => {
          return (
            <ModalFilterOption
              key={`${index}-key-${filter}`}
              text={filter}
              isSelected={checkIfFilterSelected(filter, filtersSelected)}
              onSelect={() => handleFilterSelection(filter)}
            />
          );
        })}
      </OptionsWrapper>
      <div className="flex justify-end">
        <button
          className="p-2 bg-red-600 text-white rounded mt-4 mr-3 w-20"
          onClick={onFiltersClear}
        >
          Clear
        </button>
        <button
          className="p-2 bg-accent-color text-white rounded mt-4 w-20"
          onClick={onFiltersSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

const SearchModalOptions: React.FC<OptionsProps> = ({
  availableOptions,
  optionSelected,
  onSelect,
}) => {
  const handleSelection = (newOption: string) => {
    console.log("handleSelection-option:", newOption);
    onSelect(newOption);
  };

  return (
    <OptionsWrapper>
      {availableOptions.map((option, index) => (
        <ModalOption
          key={`${index}-key-${option}`}
          text={option}
          isSelected={checkIfFilterSelected(option, optionSelected)}
          onSelect={() => handleSelection(option)}
        />
      ))}
    </OptionsWrapper>
  );
};

const OptionsWrapper: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="flex flex-row flex-wrap max-h-80 overflow-y-auto">
      {children}
    </div>
  );
};

export const SearchBarOptionsModal: React.FC<SearchBarOptionsModalProps> = ({
  isOpen,
  optionsToDisplay,
  filtersSelected,
  updateSelectedFilters,
  sortOptionSelected,
  updateSelectedSortOption,
  layoutOptionSelected,
  updateSelectedLayoutOption,
}) => {
  const router = useRouter();
  const openModalOptionClass = isOpen ? "" : " hidden";
  const optionsModalClasses = `z-10 bg-white shadow shadow-black p-3 absolute w-80 top-full rounded-br-lg rounded-bl-lg${openModalOptionClass}`;
  const displayFilterOptions = optionsToDisplay === ModalDisplayOptions.Filter;
  const displaySortByOptions = optionsToDisplay === ModalDisplayOptions.SortBy;
  const displayLayoutOptions = optionsToDisplay === ModalDisplayOptions.Layout;

  const redirectToMenuItems = (urlQuery: string) => {
    const menuItemBaseUrl = "/menu/items?";
    router.push(`${menuItemBaseUrl}${urlQuery}`);
  };

  const onFilterOptionSave = (arrayOfFilters: string[]) => {
    const stringifiedFilters = arrayOfFilters.join(",");
    redirectToMenuItems(`filters=${stringifiedFilters}`);
  };

  const onSortbySelect = (newSortOption: string) => {
    updateSelectedSortOption(newSortOption);
    redirectToMenuItems(`sortBy=${newSortOption}`);
  };

  const onLayoutSelect = (newLayoutOption: string) => {
    updateSelectedLayoutOption(newLayoutOption);
    redirectToMenuItems(`layout=${newLayoutOption}`);
  };

  return (
    <div className={optionsModalClasses}>
      {displayFilterOptions && (
        <FilterOptions
          filtersSelected={filtersSelected}
          updateSelectedFilters={updateSelectedFilters}
          onSave={onFilterOptionSave}
        />
      )}
      {displaySortByOptions && (
        <SearchModalOptions
          availableOptions={sortOptions}
          optionSelected={sortOptionSelected}
          onSelect={onSortbySelect}
        />
      )}
      {displayLayoutOptions && (
        <SearchModalOptions
          availableOptions={layoutOptions}
          optionSelected={layoutOptionSelected}
          onSelect={onLayoutSelect}
        />
      )}
    </div>
  );
};

const SearchBarOption: React.FC<SearchBarOptionProps> = ({
  text,
  clickHandler,
}) => (
  <div className="p-1 rounded mx-1 my-3 cursor-pointer" onClick={clickHandler}>
    {text}
  </div>
);

export default SearchBarOption;
