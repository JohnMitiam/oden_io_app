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
        type={dataType}
        readOnly={readonly}
        value={inputValue}
        className="p-2 w-full bg-white border border-gray-300 rounded-md outline-none transition-all focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
        onChange={(e) => {
          setInputValue(e.target.value);
          if (onChange) onChange(e);
        }}
      />
    </div>
  );
};
