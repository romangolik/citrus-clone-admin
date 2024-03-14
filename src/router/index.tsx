import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "@pages/Login";
import Profile from "@pages/Profile";
import EditProduct from "@pages/Products/Edit";
import StickersList from "@pages/Stickers/List";
import ProductsList from "@pages/Products/List";
import EditCategory from "@pages/Categories/Edit";
import CustomersList from "@pages/Customers/List";
import CreateProduct from "@pages/Products/Create";
import CategoriesList from "@pages/Categories/List";
import CreateCustomer from "@pages/Customers/Create";
import CreateCategory from "@pages/Categories/Create";
import ProductsMediaList from "@pages/Products/MediaList";
import CreateEditSticker from "@pages/Stickers/CreateEdit";
import ManageAttributes from "@pages/Categories/ManageAttributes";

import PortalLayout from "./components/PortalLayout";

import { Routes } from "./routes";
import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";

const router = createBrowserRouter([
  {
    path: Routes.root(),
    element: (
      <AuthGuard>
        <PortalLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: Routes.root(),
        element: <Navigate to={Routes.profile()} replace />,
      },
      {
        path: Routes.root(),
        children: [
          {
            path: Routes.categories(),
            element: <CategoriesList />,
          },
          {
            path: Routes.createCategory(),
            element: <CreateCategory />,
          },
          {
            path: Routes.editCategory(),
            element: <EditCategory />,
          },
          {
            path: Routes.categoryManageAttributes(),
            element: <ManageAttributes />,
          },
        ],
      },
      {
        path: Routes.root(),
        children: [
          {
            path: Routes.products(),
            element: <ProductsList />,
          },
          {
            path: Routes.productsMedia(),
            element: <ProductsMediaList />,
          },
          {
            path: Routes.createProduct(),
            element: <CreateProduct />,
          },
          {
            path: Routes.editProduct(),
            element: <EditProduct />,
          },
        ],
      },
      {
        path: Routes.root(),
        children: [
          {
            path: Routes.stickers(),
            element: <StickersList />,
          },
          {
            path: Routes.createSticker(),
            element: <CreateEditSticker />,
          },
          {
            path: Routes.editSticker(),
            element: <CreateEditSticker />,
          },
        ],
      },
      {
        path: Routes.root(),
        children: [
          {
            path: Routes.customers(),
            element: <CustomersList />,
          },
          {
            path: Routes.createCustomer(),
            element: <CreateCustomer />,
          },
          {
            path: Routes.editCustomer(),
            element: <div>Edit Customer</div>,
          },
        ],
      },
      {
        path: Routes.profile(),
        element: <Profile />,
      },
    ],
  },
  {
    path: Routes.login(),
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: Routes.notFound(),
    element: <div>Not Found Page</div>,
  },
]);

export default router;
