import { useEffect, useState } from "react";

interface Props {
  label: string;
  dataType?: "text" | "number";
  readonly?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<Props> = ({
  label,
  value,
  readonly,
  onChange,
  dataType = "text",
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div>
      <div className="text-gray-800 text-sm py-1">{label}</div>
      <input
        datatype={dataType}
        readOnly={readonly}
        className="border rounded-md p-2 w-full border-primary-300 focus:border-primary-500 focus:ring-primary-500"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
    </div>
  );
};
