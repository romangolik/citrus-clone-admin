import React, { FC } from "react";

import { Button } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { Link, useSearchParams } from "react-router-dom";

import { StickerDto, stickersService } from "@services/stickers";

import Icon from "@components/ui/Icon";
import { Modals } from "@components/modals";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import FiltersPanel from "@components/shared/FiltersPanel";
import { RouterBasedTable } from "@components/layout/Table";

import { Routes } from "@router/routes";

import { TABLE_COLUMNS } from "./data/table-columns";

import { IPaginatedResult } from "@utils/types/pagination";

import "./StickersList.scss";

const DEFAULT_VALUE = {
  data: [],
  page: 1,
  limit: 5,
  total: 0,
  totalPages: 0,
} as IPaginatedResult<StickerDto>;

const StickersList: FC = () => {
  const [searchParams] = useSearchParams();
  const { data: stickers = DEFAULT_VALUE, isLoading } =
    stickersService.useGetPaginatedStickersQuery(
      Object.fromEntries(searchParams)
    );
  const [deleteSticker] = stickersService.useDeleteStickerMutation();

  function deleteStickerHandler(id: number) {
    NiceModal.show(Modals.ConfirmationModal, {
      message: "Чи бажаєте ви видалити даний стікер?",
    }).then(() => deleteSticker(id));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout className="stickers-list-page">
      <PageLayout.Header className="aife">
        <PageLayout.Title badgeContent={stickers.total}>
          Список стікерів
        </PageLayout.Title>
        <Button
          to={Routes.createSticker()}
          color="success"
          component={Link}
          startIcon={<Icon name="plus" size="fill" />}>
          Створити стікер
        </Button>
      </PageLayout.Header>
      <PageLayout.Content className="stickers-list-page__content">
        <FiltersPanel>
          <FiltersPanel.Search />
        </FiltersPanel>
        <ContentBox>
          <RouterBasedTable
            enableDelete
            data={stickers.data}
            columns={TABLE_COLUMNS}
            page={stickers.page}
            count={stickers.total}
            rowsPerPage={stickers.limit}
            onDeleteAction={deleteStickerHandler}
          />
        </ContentBox>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default StickersList;
