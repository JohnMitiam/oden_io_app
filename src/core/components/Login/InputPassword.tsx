import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Props {
    label: string;
    dataType?: 'password';
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword: React.FC<Props> = ({
    label,
    value,
    onChange,
    dataType = 'password'
}) => {
    const [inputValue, setInputValue] = useState(value);
    
    useEffect(() => {
        setInputValue(value);
    }, [value])

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">
            <div className="text-gray-800 text-sm py-1">{label}</div>
            <div className="flex items-center border border-gray-300 rounded-md bg-white focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-400 transition-all">
            <input
                type={showPassword ? 'text' : dataType}
                className="p-2 w-full bg-transparent outline-none"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    if (onChange) {
                        onChange(e)
                    }
                }}
            />
            <button className="pr-2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword
                ? <EyeSlashIcon className="text-gray-400 hover:text-gray-600 w-4" />
                : <EyeIcon className="text-gray-400 hover:text-gray-600 w-4" />}
            </button>
            </div>
        </div>
    )
}
