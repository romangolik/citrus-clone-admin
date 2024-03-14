import React, { FC, useState, PropsWithChildren } from "react";

import classNames from "classnames";
import { Popover } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import Icon from "@components/ui/Icon";

import "./Filters.scss";

export interface FiltersProps extends PropsWithChildren {}

const Filters: FC<FiltersProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function closeHandler() {
    setAnchorEl(null);
  }

  function clearFilters(event: React.MouseEvent<HTMLParagraphElement>) {
    event.stopPropagation();

    const NOT_DELETABLE_PARAMS = ["limit", "search", "sort"];

    const newSearchParams = new URLSearchParams();

    NOT_DELETABLE_PARAMS.forEach((item) => {
      const paramValue = searchParams.get(item);
      if (paramValue) {
        newSearchParams.set(item, paramValue);
      }
    });

    setSearchParams(newSearchParams);
  }

  return (
    <div className="filters df aic">
      <button
        className={classNames("filters__button df aic", {
          filters__button_active: open,
        })}
        onClick={clickHandler}>
        <Icon name="filters" size="large" className="filters__icon" />
        <span className="filters__text fz17 medium-weight">Фільтри</span>
      </button>
      <Popover
        open={open}
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: "left",
        }}
        onClose={closeHandler}>
        <div className="filters__sections">
          <p className="filters__clear fz14" onClick={clearFilters}>
            Очистити все
          </p>
          {React.Children.map(children, (selectorElement, index) => (
            <div key={index} className="filters__sections-item">
              {selectorElement}
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default Filters;
