import { PlusIcon } from '@heroicons/react/24/outline';
import { type FieldHookConfig, useField } from 'formik';
import tw from 'tailwind-styled-components';

interface BaseInputProps {
    hasError: boolean;
}

const BaseInput = tw.input<BaseInputProps>
    `border border-r rounded-l-md rounded--r-none p-2 w-full placeholder:text-sm border-gray-300
    ${(props) =>
        !props.hasError &&
        !props.value &&
        'border-primary-300 focus:border-primary-500 focus:ring-primary-500'}
    ${(props) =>
        !props.hasError &&
        !!props.value &&
        'border-primary-300 focus:border-primary-500 focus:ring-primary-500'}
    ${(props) =>
        props.hasError &&
        !!props.value &&
        'border-primary-300 focus:border-primary-500 focus:ring-primary-500'}
    ${(props) =>
        props.hasError &&
        !!props.value &&
        'border-red-300 focus:border-red-500 focus:ring-red-100'}
    `;

type Props = {
  label?: string;
  dataType?: "text" | "number";
  placeholder?: string;
  readonly?: boolean;
  optional?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
} & FieldHookConfig<string>;

export const AdditionalFormikInput: React.FC<Props> = ({
  label,
  dataType = "text",
  readonly,
  placeholder,
  optional = false,
  onChange,
  onClick,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="text-gray-800 text-sm font-medium py-1">
        {label}
        <span className="text-gray-400 pl-1">{optional && "(optional)"}</span>
      </div>

      <div>
        <div className='flex w-full'>
        <BaseInput
          {...field}
          datatype={dataType}
          readOnly={readonly}
          placeholder={placeholder}
          type="text"
          onChange={(e: any) => {
            field.onChange(e);
            onChange && onChange(e);
          }}
          hasError={!!meta.error}
          />
          <div onClick={(e) => {
            e.preventDefault();
            onClick && onClick();
          }} className="p-2 rounded-r-md border border-l-0 border-primary-300 flex items-center">
            <PlusIcon className="w-5 text-gray-500 stroke-1.5" />
          </div>
          </div>
        {meta.error ? (
          <div className="text-red-500 text-sm">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};
