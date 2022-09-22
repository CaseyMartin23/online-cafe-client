import React from "react";

type SearchBarProps = {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  onInputChange,
  onSearchSubmit,
}) => {
  return (
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
  );
};

export default SearchBar;
