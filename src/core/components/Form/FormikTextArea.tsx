import { type FieldHookConfig, useField } from 'formik';
import tw from 'tailwind-styled-components';

interface BaseInputProps {
    hasError: boolean;
}

const BaseInput = tw.textarea<BaseInputProps>
    `border rounded-md p-2 w-full border-gray-300
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
