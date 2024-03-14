import React, { FC, useState } from "react";

import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

import Icon from "@components/ui/Icon";

import "./SearchField.scss";

export interface SearchFieldProps {
  placeholder?: string;
}

const SearchField: FC<SearchFieldProps> = ({
  placeholder = "Введіть дані для пошуку...",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function removeSearchParam() {
    searchParams.delete("search");
    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  function clearInput() {
    setSearch("");
    removeSearchParam();
  }

  function searchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (search.trim().length === 0) {
      removeSearchParam();
    } else {
      searchParams.delete("page");
      searchParams.set("search", search);
      setSearchParams(searchParams);
    }
  }

  return (
    <form
      className={classNames(
        "search-field df",
        search.trim().length !== 0 && "search-field_filled"
      )}
      onSubmit={searchHandler}>
      <div className="search-field__inner df aic">
        <input
          type="text"
          className="search-field__input"
          placeholder={placeholder}
          value={search}
          onChange={onChangeHandler}
        />
        <button type="button" className="search-field__clear-button cup" onClick={clearInput}>
          <Icon name="cancel" className="search-field__clear-button-icon" />
        </button>
      </div>
      <button type="submit" className="search-field__button cup">
        <Icon name="search" className="search-field__button-icon" />
      </button>
    </form>
  );
};

export default SearchField;
