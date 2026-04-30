import * as Yup from "yup";
import type { ResultViewModel } from "./common/ResultViewModel";
import type { TableViewModel } from "./common/TableViewModel";

export interface ProductViewModel {
  id: number;
  name: string;
  description: string;
  price: string;
  productCategoryId: number
  productCategories: ProductCategoriesViewModel[];
  // imageData: string;
  isActive: boolean;
}

export interface ProductCategoriesViewModel {
  id: number;
  productId: number;
  categoryId: number;
  categories: [];
  name: string;
  isDeleted: boolean;
}

export interface ProductTableResultViewModel
  extends TableViewModel, ResultViewModel {
  data: ProductViewModel[];
}

export interface ProductResultViewModel extends ResultViewModel {
  data: ProductViewModel;
}

export interface CategoryListResultViewModel extends ResultViewModel {
  data: ProductViewModel[];
}

export const productDefaultValue: ProductViewModel = {
  id: 0,
  name: "",
  description: "",
  price: "",
  productCategoryId: 0,
  productCategories: [],
  // imageData: "",
  isActive: true,
};

export const productTableDefaultValue: ProductTableResultViewModel = {
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
  isSuccess: true,
  errorMessages: [],
};

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name cannot exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Category name can only contain letters, numbers, spaces, hyphens, and underscores",
    )
    .trim("Product name should not have leading or trailing spaces"),

  description: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value)), // Convert empty string to null
});
