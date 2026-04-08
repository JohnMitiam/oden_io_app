import React from 'react';
import { type FieldHookConfig, useField } from 'formik';
import tw from 'tailwind-styled-components';
import { 
  Editor, 
  EditorProvider, 
  Toolbar, 
  BtnBold, 
  BtnItalic, 
  BtnBulletList, 
  BtnNumberedList, 
  BtnClearFormatting 
} from 'react-simple-wysiwyg';

interface EditorWrapperProps {
  hasError: boolean;
}

const EditorWrapper = tw.div<EditorWrapperProps>`
  rounded-md border bg-white overflow-hidden text-black text-left
  ${(props) => props.hasError 
    ? 'border-red-500 ring-1 ring-red-100' 
    : 'border-gray-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500'}
`;

type Props = {
  label?: string;
  optional?: boolean;
} & FieldHookConfig<string>;

export const FormikRichTextArea: React.FC<Props> = ({ label, optional, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="mb-6">
      <label className="block text-gray-800 text-sm font-semibold mb-2 text-left">
        {label}
        {optional && <span className="text-gray-400 font-normal ml-1">(optional)</span>}
      </label>

      <EditorWrapper hasError={!!meta.error && meta.touched}>
        <EditorProvider>
          <Editor 
            value={field.value || ''} 
            onChange={(e) => helpers.setValue(e.target.value)}
            onBlur={() => helpers.setTouched(true)}
            className="min-h-[200px] outline-none p-3"
          >
            <Toolbar>
              <BtnBold />
              <BtnItalic />
              <BtnBulletList />
              <BtnNumberedList />
              <BtnClearFormatting />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </EditorWrapper>

      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600 text-left">{meta.error}</p>
      )}
    </div>
  );
};