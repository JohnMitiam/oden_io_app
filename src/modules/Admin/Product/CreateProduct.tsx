import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { InformationCircleIcon, PhotoIcon, PlusIcon, RectangleStackIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

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
import { InputImg } from "../../../core/components/Form/InputImg";

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
            categoryName: cat.find((c) => c.id === pc.categoryId)?.name || "",
          })),
          // Ensure images are mapped correctly for the API
          Images: value.productImages.map((img) => ({
            imageData: img.imageData,
            mimeType: img.mimeType,
            isPrimary: img.isPrimary,
          })),
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
          <div className="flex justify-between items-center mb-2 border-b p-4">
            <div>
              <h1 className="font-bold text-gray-900">
                Create Product
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4">
              <FormsContainer>
                <div className="flex items-center gap-2">
                    <InformationCircleIcon className="w-5 text-primary-600" />
                    <span className="font-semibold text-sm">Basic Information</span>
                  </div>
                <div className="grid grid-cols-10 space-x-3">
                  <div className="col-span-8">
                    <FormikInput
                      name="name"
                      label="Name" 
                      placeholder="Enter product name..." />
                  </div>
                  <div className="col-span-2">
                    <FormikInput name="price" label="Price" type="number" />
                  </div>
                </div>
                <FormikRichTextArea name="description" label="Description" />
                
                {/* Product Gallery (Multiple Images) */}
                <div className="flex flex-col space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <Squares2X2Icon className="w-5 text-primary-600" />
                    <span className="font-semibold text-sm">Product Gallery</span>
                  </div>
                  <InputImg
                    columns={5}
                    value={formikProps.values.productImages.filter((img) => !img.isPrimary)}
                    onMultipleChange={(files) => {
                      const primaryImage = formikProps.values.productImages.filter((img) => img.isPrimary);
                      const formattedGallery = files.map((img) => ({
                        id: 0,
                        productId: formikProps.values.id,
                        imageData: img.base64,
                        mimeType: img.file.type,
                        isPrimary: false,
                      }));
                      formikProps.setFieldValue("productImages", [...primaryImage, ...formattedGallery]);
                    }}
                  />
                </div>
              </FormsContainer>
            </div>

            {/* Sidebar: col-span-2 */}
            <div className="col-span-2 px-6 space-y-4">
              {/* Primary Image Upload */}
              <div className="flex flex-col space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <PhotoIcon className="w-5 text-primary-600" />
                  <div className="font-semibold text-sm">Primary Image</div>
                </div>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-2 min-h-40 flex flex-col items-center justify-center">
                  <InputImg
                    columns={1}
                    value={formikProps.values.productImages.filter((img) => img.isPrimary)}
                    onMultipleChange={(files) => {
                      const galleryImages = formikProps.values.productImages.filter((img) => !img.isPrimary);
                      const lastFile = files[files.length - 1];
                      if (lastFile) {
                        const newPrimary = {
                          id: 0,
                          productId: formikProps.values.id,
                          imageData: lastFile.base64,
                          mimeType: lastFile.file.type,
                          isPrimary: true,
                        };
                        formikProps.setFieldValue("productImages", [newPrimary, ...galleryImages]);
                      } else {
                        formikProps.setFieldValue("productImages", galleryImages);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Product Categories */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <RectangleStackIcon className="w-5 text-primary-600" />
                  <div className="font-semibold text-sm">Select Categories</div>
                </div>
                <ul className="overflow-y-auto max-h-[330px] custom-scrollbar border border-gray-400 rounded-md bg-white px-4 py-2 space-y-3">
                  {cat.map((row) => {
                    const isChecked = formikProps.values.productCategories.some(
                      (pc) => pc.categoryId === row.id
                    );

                    return (
                      <li key={row.id} className="last:border-0 hover:bg-gray-50">
                        <label className="flex items-center p-2 cursor-pointer space-x-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 bg-white border-gray-300 rounded text-primary-600 focus:ring-offset-white focus:ring-2"
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

          {showCreateCategory && (
            <Modal show={true}>
              <div className="p-4">
                <PopupHeader onClose={() => setShowCreateCategory(false)}>
                  <RectangleStackIcon className="w-5 text-gray-500" />
                  Create Category
                </PopupHeader>
                <CreateCategory 
                  loadData={async () => handleRefresh()}
                  onClose={() => setShowCreateCategory(false)} 
                />
              </div>
            </Modal>
          )}
        </form>
      )}
    </Formik>
  );
};