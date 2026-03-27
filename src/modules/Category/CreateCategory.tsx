import { Formik } from "formik";

import {
  categoryDefaultValue,
  categoryValidationSchema,
} from "../../models/Category";
import { CategoryServices } from "../../services/Category";
import { FormsContainer, FormikInput, CancelButton, FormikSubmit } from "../../core/components/Form";

interface Props {
  onClose?: () => void;
  loadData?: () => void;
}

export const CreateCategory: React.FC<Props> = ({ onClose, loadData }) => {
  return (
    <>
      <Formik
        initialValues={categoryDefaultValue}
        validationSchema={categoryValidationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={async (value, actions) => {
          try {
            const result = await CategoryServices.create(value);
            if (result.status === 201) {
              loadData?.();
              onClose?.();
            } else {
              console.error("create error:", result);
              alert("An error occurred while creating the category.");
            }
          } catch (error: any) {
            console.error("create error:", error);
            alert("An error occurred while creating the category.");
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {(formikProps) => {

          return (
            <>
              <form method="POST" onSubmit={formikProps.handleSubmit}>
                <FormsContainer>
                  <FormikInput name="icon" label="Icon" placeholder="Paste SVG code here (e.g., <svg...)" />
                  <FormikInput name="name" label="Name" />
                  <FormikInput name="description" label="Description" />
                </FormsContainer>
                <div className="flex justify-end space-x-3">
                  <CancelButton onClick={() => onClose?.()}>
                    Cancel
                  </CancelButton>
                  <FormikSubmit
                    label="Save"
                    disabled={formikProps.isSubmitting}
                  />
                </div>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};
