import { Formik } from "formik";
import { productDefaultValue, productValidationSchema } from "../../models/Product";
import { ProductServices } from "../../services/Products";
import { CancelButton, FormikInput, FormikRichTextArea, FormikSubmit, FormsButtonContainer, FormsContainer } from "../../core/components/Form";
import { routes } from "../../config/routes";
import { useNavigate } from "react-router";

export const CreateProduct = () => {
    const navigate = useNavigate();
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
                            Create Property
                        </div>
                        <form method="POST" onSubmit={formikProps.handleSubmit}>
                            <div className="grid grid-cols-5">
                                <div className="col-span-4">
                                    <FormsContainer>
                                        <FormikInput name="name" label="Name" />
                                        <FormikInput name="categoryId" label="Category" />
                                        <FormikInput name="price" label="Price" type="number" />
                                        <FormikRichTextArea name="description" label="Description" />
                                    </FormsContainer>
                                </div>
                                <div className="col-span-1">
                                    This is where Category Selection
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