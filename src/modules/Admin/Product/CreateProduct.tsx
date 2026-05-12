import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { PlusIcon, PhotoIcon, RectangleStackIcon } from "@heroicons/react/24/outline";

import { routes } from "../../../config/routes";
import { 
  FormsContainer, 
  FormikInput, 
  FormikRichTextArea, 
  FormsButtonContainer, 
  CancelButton, 
  FormikSubmit 
} from "../../../core/components/Form";
import { productDefaultValue, productValidationSchema } from "../../../models/Product";
import { ProductServices } from "../../../services/Products";
import { CategoryServices } from "../../../services/Category";
import type { CategoryViewModel } from "../../../models/Category";
import { Modal, PopupHeader } from "../../../core/components/Box";
import { CreateCategory } from "../Category/CreateCategory";

export const CreateProduct = () => {
  const [cat, setCat] = useState<CategoryViewModel[]>([]);
  const navigate = useNavigate();
  const [showCreateCategory, setShowCreateCategory] = useState(false);
const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const loadCategories = async () => {
    try {
      const res = await CategoryServices.getList(1, 999);
      setCat(res.data);
    } catch (error) {
      console.error("Failed to load Categories", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [refreshTrigger]);

  return (
    <Formik
      initialValues={productDefaultValue}
      validationSchema={productValidationSchema}
      validateOnBlur={true}
      onSubmit={async (value, actions) => {
        const payload = {
          ...value,
          Categories: value.productCategories.map((pc) => ({
            categoryId: pc.categoryId,
            categoryName: 
              cat.find((c) => c.id === pc.categoryId)
              ?.name || "",
          }))
        };

        try {
          const result = await ProductServices.create(payload);
          if (result.status === 201) {
            navigate(`${routes.PRODUCTS}`);
          }
        } catch (error) {
          console.error("Error creating product:", error);
          alert("An error occurred while creating the product.");
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <div className="font-semibold text-xl text-black text-center mb-6">
            Create Product
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4">
              <FormsContainer>
                <FormikInput name="name" label="Name" />
                <FormikInput name="price" label="Price" type="number" />
                <FormikRichTextArea name="description" label="Description" />
              </FormsContainer>
            </div>

            <div className="col-span-2 px-6 space-y-4">
              {/* Primary Image Placeholder */}
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-sm">Primary Image</span>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                  <PhotoIcon className="w-10 h-10" />
                  <span className="text-xs mt-2">Upload Image Placeholder</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-sm">Select Categories</span>
                <ul className="overflow-y-auto max-h-58 custom-scrollbar border border-gray-400 rounded-md bg-white px-4 py-2 space-y-2">
                  {cat.map((row) => {
                    const isChecked = formikProps.values.productCategories.some(
                      (pc) => pc.categoryId === row.id
                    );

                    return (
                      <li key={row.id} className="last:border-0 hover:bg-gray-50">
                        <label className="flex items-center p-2 cursor-pointer space-x-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 bg-white border-gray-300 rounded text-blue-600 focus:ring-offset-white focus:ring-2"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                formikProps.setFieldValue("productCategories", [
                                  ...formikProps.values.productCategories,
                                  {
                                    id: 0,
                                    productId: formikProps.values.id,
                                    categoryId: row.id,
                                    name: "",
                                  },
                                ]);
                              } else {
                                formikProps.setFieldValue(
                                  "productCategories",
                                  formikProps.values.productCategories.filter(
                                    (pc) => pc.categoryId !== row.id
                                  )
                                );
                              }
                            }}
                          />
                          <span className="text-sm font-medium">{row.name}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateCategory(true)}
                className="flex items-center gap-2 py-2 px-3 border border-gray-800 hover:bg-gray-50 rounded-md w-full justify-center transition-colors"
              >
                <PlusIcon className="w-5" />
                <span className="text-sm">Add New Category</span>
              </button>
            </div>

            {showCreateCategory && (
                <Modal show={true}>
                    <div className="p-4">
                        <PopupHeader onClose={() => setShowCreateCategory(false)}>
                            <RectangleStackIcon className="w-5 text-gray-500" />
                            Create Category
                        </PopupHeader>
                        <CreateCategory loadData={async () => {
                            handleRefresh();
                        }}
                        onClose={() => setShowCreateCategory(false)} />
                    </div>
                </Modal>
            )}
          </div>

          <FormsButtonContainer>
            <CancelButton onClick={() => navigate(`${routes.PRODUCTS}`)}>
              Cancel
            </CancelButton>
            <FormikSubmit
              label="Save"
              disabled={formikProps.isSubmitting}
            />
          </FormsButtonContainer>
        </form>
      )}
    </Formik>
  );
};