import { type FieldHookConfig, useField } from 'formik';
import tw from 'tailwind-styled-components';

interface BaseInputProps {
    hasError: boolean;
}

const BaseInput = tw.textarea<BaseInputProps>
    `p-2 w-full bg-white border border-gray-300 rounded-md outline-none transition-all focus:border-primary-400 focus:ring-1 focus:ring-primary-400
    ${(props) =>
        !props.hasError &&
        !props.value &&
        'border-primary-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400'}
    ${(props) =>
        !props.hasError &&
        !!props.value &&
        'border-primary-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400'}
    ${(props) =>
        props.hasError &&
        !!props.value &&
        'border-primary-300 focus:border-primary-400 focus:ring-1 focus:ring-primary-400'}
    ${(props) =>
        props.hasError &&
        !!props.value &&
        'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400'}
    `;

type Props = {
  label?: string;
  dataType?: 'text' | 'number';
  readonly?: boolean;
  optional?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & FieldHookConfig<string>;

export const FormikTextArea: React.FC<Props> = ({
  label,
  dataType = 'text',
  readonly,
  onChange,
  optional = false,
  ...props
}) => {
  const [field, meta] = useField(props);

    return (
    <div>
        <div className="text-gray-800 text-sm font-medium py-1">
          {label}
          <span className='text-gray-400 pl-1'>
            {optional && ("(optional)")}
          </span>
        </div>
        <div>
            <BaseInput
                {...field}
                datatype={dataType}
                readOnly={readonly}
                type='text'
                onChange={(e: any) => {
            field.onChange(e);
            onChange && onChange(e);
          }}
          hasError={!!meta.error}
            />
            {meta.error ? (
          <div className="text-red-500 text-sm">
            {meta.error}
          </div>
        ) : null}
        </div>   
            
    </div>
    )
}
