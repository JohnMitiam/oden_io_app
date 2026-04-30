import { Formik } from "formik";
import { useNavigate } from "react-router";
import { routes } from "../../../config/routes";
import { FormsContainer, FormikInput, FormikRichTextArea, FormsButtonContainer, CancelButton, FormikSubmit } from "../../../core/components/Form";
import { productDefaultValue, productValidationSchema } from "../../../models/Product";
import { ProductServices } from "../../../services/Products";
import { useEffect, useState } from "react";
import type { CategoryViewModel } from "../../../models/Category";
import { CategoryServices } from "../../../services/Category";
import { PlusIcon } from "@heroicons/react/24/outline";

export const CreateProduct = () => {
    const [cat, setCat] = useState<CategoryViewModel[]>([]);
    const navigate = useNavigate();

    const loadCategories = async () => {
        try {
            const res = await CategoryServices.getList(1, 999);
            setCat(res.data);

            // if (res.data.length > 0) {
            //     const defaultCategories: ProductCategoriesViewModel = {
            //         id: 0,
            //         categoryId: 0,
            //         name: "",
            //         isDeleted: false,
            //     }
            // }
        } catch (error) {
            console.error("Failed to load Categories", error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <>
            <Formik
                initialValues={productDefaultValue}
                validationSchema={productValidationSchema}
                validateOnBlur={true}
                onSubmit={async (value, actions) => {
                    try {
                        const result = await ProductServices.create(value);
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
                {(formikProps) => {
                    return (
                        <>
                        <div className="font-semibold text-xl text-black text-center">
                            Create Product
                        </div>
                        <form method="POST" onSubmit={formikProps.handleSubmit}>
                            <div className="grid grid-cols-6">
                                <div className="col-span-5">
                                    <FormsContainer>
                                        <FormikInput name="name" label="Name" />
                                        <FormikInput name="price" label="Price" type="number" />
                                        <FormikRichTextArea
                                        name="description" label="Description" />
                                    </FormsContainer>
                                </div>
                                <div className="col-span-1">
                                    <div className="px-6 space-y-4">
                                    <div className="font-semibold">Select Categories</div>
                                    <ul className="overflow-y-auto max-h-60 border border-gray-400 rounded-md p-2">
                                    {cat.map((row) => {
                                        const isChecked =
                                            formikProps.values.productCategories
                                            .some((pc) => pc.categoryId === row.id);

                                        return (
                                            <>
                                            <li key={row.id}
                                                className="flex flex-col space-y-1 p-2 border-b" >
                                                    <label className="grid grid-cols-5 items-center space-x-2">
                                                        <div className="col-span-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                              if (e.target.checked) {
                                                                formikProps.setFieldValue(
                                                                  "productCategories",
                                                                [
                                                                    ...formikProps.values
                                                                      .productCategories,
                                                                    {
                                                                      id: 0,
                                                                      productId:
                                                                        formikProps.values.id,
                                                                      categoryId: row.id,
                                                                      name: "",
                                                                    },
                                                                  ]
                                                                );
                                                              } else {
                                                                formikProps.setFieldValue(
                                                                  "productCategories",
                                                                  formikProps.values.productCategories.filter(
                                                                    (pc) =>
                                                                      pc.categoryId !== row.id
                                                                  )
                                                                );
                                                              }
                                                            }}
                                                          />
                                                        </div>
                                                          <div className="font-medium col-span-3">
                                                            {row.name}
                                                          </div>
                                                        <div className="col-span-1"></div>
                                                    </label>
                                            </li>
                                            
                                            </>
                                        )
                                    })}
                                    </ul>
                                    <div  className="flex gap-2 py-1 px-2 border hover:bg-gray-50 rounded-md border-gray-800">
                                        <PlusIcon className="w-5" />
                                        <div>Add New Category</div>
                                    </div>
                                    </div>
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
                        </form>
                        </>
                    )
                }}
            </Formik>
        </>
    );
}