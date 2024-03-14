import { FC, useState } from "react";

import { Link } from "react-router-dom";
import { Menu, Button, MenuItem } from "@mui/material";

import { ProductType } from "@services/products";

import Icon from "@components/ui/Icon";

import { Routes } from "@router/routes";

const CreateProductButton: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function closeHandler() {
    setAnchorEl(null);
  }

  return (
    <>
      <Button
        color="success"
        onClick={clickHandler}
        startIcon={<Icon name="plus" size="fill" />}
        endIcon={<Icon name="arrow-bottom" size="fill" />}>
        Створити продукт
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: "right",
        }}
        onClose={closeHandler}>
        <MenuItem
          component={Link}
          to={Routes.createProduct(ProductType.SIMPLE)}>
          Простий
        </MenuItem>
        <MenuItem
          component={Link}
          to={Routes.createProduct(ProductType.CONFIGURABLE)}>
          Конфігурований
        </MenuItem>
      </Menu>
    </>
  );
};

export default CreateProductButton;
