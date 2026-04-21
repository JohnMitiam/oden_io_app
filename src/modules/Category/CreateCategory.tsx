import { Formik } from "formik";
import * as OutlineIcons from '@heroicons/react/24/outline';
import * as SolidIcons from '@heroicons/react/24/solid';

import {
  categoryDefaultValue,
  categoryValidationSchema,
} from "../../models/Category";
import { CategoryServices } from "../../services/Category";
import { FormsContainer, FormikInput, CancelButton, FormikSubmit, FormikTextArea, FormsButtonContainer } from "../../core/components/Form";
import { useState } from "react";
import { Modal, PopupHeader } from "../../core/components/Box";
import { PhotoIcon, ShieldCheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { IconPicker } from "../../core/components/IconPicker";
import React from "react";

interface Props {
  onClose?: () => void;
  loadData?: () => void;
}

export const CreateCategory: React.FC<Props> = ({ onClose, loadData }) => {
  const [showHeroIcons, setShowHeroIcons] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [iconType, setIconType] = useState<'outline' | 'solid'>('outline');

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const iconLibrary = iconType === 'outline' ? OutlineIcons : SolidIcons;

  const filteredIcons = Object.entries(iconLibrary).filter(([name]) => 
    name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "image/svg+xml") return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const svgContent = event.target?.result as string;
      setFieldValue("icon", svgContent);
      setShowHeroIcons(false);
    };
    reader.readAsText(file);
  };

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
            <input
              type="file"
              accept=".svg"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e, formikProps.setFieldValue)}
            />

              <form method="POST" onSubmit={formikProps.handleSubmit}>
                <FormsContainer>
                  <div className="flex items-center gap-4">
                  {formikProps.values.icon ? (
                    <div 
                        className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600" 
                        dangerouslySetInnerHTML={{ __html: formikProps.values.icon }} 
                      />
                  ) : (
                    <PhotoIcon className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 p-2" />
                  )}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowHeroIcons(true)}
                      className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-lg transition-colors cursor-pointer"
                    >
                      {formikProps.values.icon ? "Change Icon" : "Select Icon"}
                    </button>
                    {formikProps.values.icon && (
                      <button 
                        type="button"
                        onClick={() => formikProps.setFieldValue("icon", "")}
                        className="text-left text-xs text-red-500 hover:text-red-700 font-medium ml-1 transition-colors cursor-pointer"
                      >
                        Remove icon
                      </button>
                    )}
                  </div>
                  </div>
                  <FormikInput name="name" label="Name" />
                  <FormikTextArea name="description" label="Description" />
                </FormsContainer>
                <FormsButtonContainer>
                  <CancelButton onClick={() => onClose?.()}>
                    Cancel
                  </CancelButton>
                  <FormikSubmit
                    label="Save"
                    disabled={formikProps.isSubmitting}
                  />
                </FormsButtonContainer>
              </form>

              {showHeroIcons && (
                <Modal show={true}>
                  <div className="p-4">
                    <PopupHeader onClose={() => setShowHeroIcons(false)}>
                      <ShieldCheckIcon className="w-5 text-primary-500" />
                      Select / Import Icon
                    </PopupHeader>

                    <div className="space-x-1 pb-2">
                      <div className="text-gray-800 text-sm font-medium py-1">
                        Search Icon
                      </div>
                      <div className="w-full relative">
                      <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search icons..." 
                        className="border-primary-300 focus:border-primary-500 focus:ring-primary-500 border rounded-md p-2 w-full border-gray-300 placeholder:text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
                          <XMarkIcon className="w-4 h-4 cursor-pointer" />
                        </button>
                      )}
                      </div>
                    </div>

                    <div className="flex space-x-2 py-4">
                      <button
                        type="button"
                        onClick={() => setIconType('outline')}
                        className={`inline-flex items-center gap-x-1 rounded-md px-3 py-1 text-xs font-medium inset-ring inset-ring-gray-500/10 transition-colors cursor-pointer ${
                          iconType === 'outline' 
                            ? 'bg-primary-200 text-primary-800' 
                            : 'text-gray-800 bg-gray-50'
                        }`}
                      >
                        Outline
                      </button>
                      <button
                        type="button"
                        onClick={() => setIconType('solid')}
                        className={`inline-flex items-center gap-x-1 rounded-md px-3 py-1 text-xs font-medium inset-ring inset-ring-gray-500/10 transition-colors cursor-pointer ${
                          iconType === 'solid' 
                            ? 'bg-primary-200 text-primary-800' 
                            : 'text-gray-800 bg-gray-50'
                        }`}
                      >
                        Solid
                      </button>
                    </div> 
                    
                    <IconPicker
                      icons={filteredIcons}
                      onSelect={(svg) => {
                      formikProps.setFieldValue("icon", svg)
                      setShowHeroIcons(false)
                      }}
                      onClose={() => setShowHeroIcons(false)}
                      browseIcon={() => fileInputRef.current?.click()} />

                  </div>
                </Modal>
              )}
            </>
          );
        }}
      </Formik>
    </>
  );
};
