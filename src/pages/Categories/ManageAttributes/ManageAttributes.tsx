import React, { FC, useState } from "react";

import { Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { useParams } from "react-router-dom";
import { TabList, TabPanel } from "@mui/lab";

import Icon from "@components/ui/Icon";
import Link from "@components/ui/Link";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import AttributesTab from "./components/AttributesTab";
import AttributeGroupsTab from "./components/AttributeGroupsTab";

import { Routes } from "@router/routes";

import "./ManageAttributes.scss";

enum ManageAttributesTabs {
  ATTRIBUTES = "ATTRIBUTES",
  ATTRIBUTE_GROUPS = "ATTRIBUTE_GROUPS",
}

const ManageAttributes: FC = () => {
  const [tab, setTab] = useState(ManageAttributesTabs.ATTRIBUTES);
  const { id: categoryId } = useParams();

  return (
    <PageLayout className="manage-attributes-page">
      <PageLayout.Header className="aic">
        <Link
          to={Routes.editCategory(+categoryId)}
          startIcon={<Icon name="back-arrow" />}>
          До категорії
        </Link>
      </PageLayout.Header>
      <PageLayout.Content className="manage-attributes-page__content">
        <ContentBox>
          <TabContext value={tab}>
            <TabList onChange={(_, value) => setTab(value)}>
              <Tab value={ManageAttributesTabs.ATTRIBUTES} label="Атрибути" />
              <Tab value={ManageAttributesTabs.ATTRIBUTE_GROUPS} label="Групи Атрибутів" />
            </TabList>
            <TabPanel value={ManageAttributesTabs.ATTRIBUTES}>
              <AttributesTab />
            </TabPanel>
            <TabPanel value={ManageAttributesTabs.ATTRIBUTE_GROUPS}>
              <AttributeGroupsTab />
            </TabPanel>
          </TabContext>
        </ContentBox>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default ManageAttributes;
