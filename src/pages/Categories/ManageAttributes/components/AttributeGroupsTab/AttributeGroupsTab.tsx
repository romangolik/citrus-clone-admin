import React, { FC, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import { Button, IconButton } from "@mui/material";

import {
  AttributeGroupDto,
  attributeGroupsService,
} from "@services/attribute-groups";

import Icon from "@components/ui/Icon";
import { Modals } from "@components/modals";
import SortableList from "@components/shared/SortableList";
import BaseSortableItem from "@components/shared/BaseSortableItem";

import "./AttributeGroupsTab.scss";

const AttributeGroupsTab: FC = () => {
  const { id } = useParams();
  const categoryId = +id;

  const { responseAttributeGroups } =
    attributeGroupsService.useGetAllAttributeGroupsByCategoryQuery(categoryId, {
      selectFromResult: (result) => ({
        responseAttributeGroups: result?.data,
      }),
    });
  const [createAttributeGroup] =
    attributeGroupsService.useCreateAttributeGroupMutation();
  const [updateAttributeGroup] =
    attributeGroupsService.useUpdateAttributeGroupMutation();
  const [deleteAttributeGroup] =
    attributeGroupsService.useDeleteAttributeGroupMutation();
  const [reorderAttributeGroups] =
    attributeGroupsService.useReorderAttributeGroupsMutation();

  const [attributeGroups, setAttributeGroups] = useState<AttributeGroupDto[]>(
    []
  );

  function reorderHandler(array: AttributeGroupDto[]) {
    const previousAttributeGroupsOrder = [...attributeGroups];
    setAttributeGroups(array);
    reorderAttributeGroups({
      categoryId,
      groupIds: array.map((item) => item.id),
    })
      .unwrap()
      .catch(() => setAttributeGroups(previousAttributeGroupsOrder));
  }

  function openModal(data?: AttributeGroupDto) {
    NiceModal.show(Modals.AttributeGroupModal, data).then(
      async (response: any) => {
        if (!data?.id) {
          createAttributeGroup({
            name: response.name,
            categoryId,
          });
        } else {
          updateAttributeGroup(response);
        }
      }
    );
  }

  function deleteHandler(id: number) {
    NiceModal.show(Modals.ConfirmationModal, {
      message: "Чи бажаєте ви видалити дану групу атрибутів?",
    }).then(() => {
      deleteAttributeGroup({ categoryId, id });
    });
  }

  useEffect(() => {
    if (responseAttributeGroups) {
      setAttributeGroups(responseAttributeGroups);
    }
  }, [responseAttributeGroups]);

  return (
    <div className="attribute-groups-tab">
      <div className="attribute-groups-tab__action-buttons">
        <Button color="success" onClick={() => openModal()}>
          Створити групу
        </Button>
      </div>
      <div>
        <SortableList
          handle
          vertical
          scrollable
          items={attributeGroups}
          sortField="id"
          className="attribute-groups-tab__list"
          onChange={reorderHandler}
          renderItem={({ value, ref, listeners, dragOverlay }) => (
            <BaseSortableItem
              ref={ref as React.Ref<HTMLLIElement>}
              listeners={listeners}
              dragOverlay={dragOverlay}>
              {value.name}
              <div className="df aic mla">
                <IconButton onClick={() => openModal(value)}>
                  <Icon name="edit" size="large" />
                </IconButton>
                <IconButton onClick={() => deleteHandler(value.id)}>
                  <Icon name="basket" size="large" />
                </IconButton>
              </div>
            </BaseSortableItem>
          )}
        />
      </div>
    </div>
  );
};

export default AttributeGroupsTab;
