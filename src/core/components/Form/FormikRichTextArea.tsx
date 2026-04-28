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
  w-full bg-white border rounded-md outline-none transition-all overflow-hidden text-black text-left
  
  ${(props) => props.hasError 
    ? 'border-red-300 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400' 
    : 'border-gray-300 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-400'}

  [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2
  [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2
  [&_li]:mb-1
`;

type Props = {
  label?: string;
  optional?: boolean;
} & FieldHookConfig<string>;

export const FormikRichTextArea: React.FC<Props> = ({ label, optional, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const hasError = !!meta.error && meta.touched;

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

      {hasError && (
        <p className="mt-1 text-sm text-red-500 italic text-left">{meta.error}</p>
      )}
    </div>
  );
};