import { ProductType } from "@services/products";

type IdParamType = number | ":id";

export const Routes = {
  root: () => "/",
  login: () => "/login",
  profile: () => "/profile",
  //Orders
  orders: () => "/orders",
  //Categories
  categories: () => "/categories",
  createCategory: () => "/categories/create",
  editCategory: (id: IdParamType = ":id") => `/categories/${id}`,
  categoryManageAttributes: (id: IdParamType = ":id") => `/categories/${id}/manage-attributes`,
  //Products
  products: () => "/products",
  productsMedia: () => "/products/media",
  createProduct: (type?: ProductType) => type ? `/products/create?type=${type}` : "/products/create",
  editProduct: (id: IdParamType = ":id") => `/products/${id}`,
  //Stickers
  stickers: () => "/stickers",
  createSticker: () => "/stickers/create",
  editSticker: (id: IdParamType = ":id") => `/stickers/${id}`,
  //Cusomers
  customers: () => "/customers",
  createCustomer: () => "/customers/create",
  editCustomer: (id: IdParamType = ":id") => `/customers/${id}`,
  //Not Found Page
  notFound: () => '*',
}