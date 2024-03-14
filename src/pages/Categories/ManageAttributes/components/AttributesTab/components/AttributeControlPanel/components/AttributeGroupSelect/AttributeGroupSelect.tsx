import React, { FC } from "react";

import { MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";

import { attributeGroupsService } from "@services/attribute-groups";

import SelectFormField from "@components/ui/SelectFormField";

const AttributeGroupSelect: FC = () => {
  const { id: categoryId } = useParams();
  const { data: attributeGroups = [] } =
    attributeGroupsService.useGetAllAttributeGroupsByCategoryQuery(+categoryId);

  return (
    <SelectFormField
      id="attribute-group-select"
      name="attributeGroupId"
      label="Група">
      <MenuItem key={'none'} value={null}>
        <em>None</em>
      </MenuItem>
      {attributeGroups.map((attributeGroup) => (
        <MenuItem key={attributeGroup.id} value={attributeGroup.id}>
          {attributeGroup.name}
        </MenuItem>
      ))}
    </SelectFormField>
  );
};

export default AttributeGroupSelect;
