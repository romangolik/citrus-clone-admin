import React, { FC, useState, useEffect } from "react";

import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

import { AttributeDto, attributesService } from "@services/attributes";

import { Modals } from "@components/modals";
import SortableList from "@components/shared/SortableList";
import AttributeListItem from "./components/AttributeListItem";
import AttributeControlPanel from "./components/AttributeControlPanel";

import "./AttributeTab.scss";

const AttributesTab: FC = () => {
  const { id } = useParams();
  const categoryId = +id;

  const { responseAttributes } = attributesService.useGetAllAttributesByCategoryQuery(
    categoryId,
    {
      selectFromResult: (result) => ({
        responseAttributes: result?.data,
      }),
    }
  );
  const [reorderAttributes] = attributesService.useReorderAttributesMutation();
  const [deleteAttribute] = attributesService.useDeleteAttributeMutation();

  const [panelData, setPanelData] = useState<AttributeDto>(null);
  const [attributes, setAttributes] = useState<AttributeDto[]>([]);
  const isPanelOpen = panelData !== null;

  function reorderHandler(array: AttributeDto[]) {
    const previousAttributesOrder = [...attributes];
    setAttributes(array);
    reorderAttributes({
      categoryId,
      ids: array.map((item) => item.id),
    })
      .unwrap()
      .catch(() => setAttributes(previousAttributesOrder));
  }

  function openPanel(data?: AttributeDto) {
    setPanelData(data);
  }

  function onCloseHandler() {
    setPanelData(null);
  }

  function deleteHandler(id: number) {
    NiceModal.show(Modals.ConfirmationModal, {
      message: "Чи бажаєте ви видалити даний атрибут?",
    }).then(() => {
      deleteAttribute({ categoryId, id });
    });
  }

  useEffect(() => {
    if (responseAttributes) {
      setAttributes(responseAttributes);
    }
  }, [responseAttributes]);

  return (
    <div className="attributes-tab">
      <div className="attributes-tab__action-buttons">
        <Button color="success" onClick={() => openPanel()}>
          Створити атрибут
        </Button>
      </div>
      <div>
        <SortableList
          handle
          vertical
          scrollable
          items={attributes}
          sortField="id"
          className="attributes-tab__list"
          onChange={reorderHandler}
          renderItem={({ value, ref, listeners, dragOverlay }) => {
            return (
              <AttributeListItem
                data={value}
                ref={ref as React.Ref<HTMLLIElement>}
                listeners={listeners}
                dragOverlay={dragOverlay}
                onEdit={openPanel}
                onRemove={deleteHandler}
              />
            );
          }}
        />
      </div>
      <AttributeControlPanel
        open={isPanelOpen}
        data={panelData}
        onClose={onCloseHandler}
      />
    </div>
  );
};

export default AttributesTab;
