import { XMarkIcon } from "@heroicons/react/24/outline"

interface Props {
    children?: React.ReactNode;
    onClose?: () => void;
}

export const PopupHeader: React.FC<Props> = ({onClose, children}) => {
    return (
        <div className="flex justify-between py-2 border-b-2 border-gray-500 space-x-2">
            <div className="flex text-sm gap-x-1 text-gray-500 font-medium w-full">
                {children}
            </div>
            <button
            onClick={onClose}
            className="text-black hover:text-red-500">
                <XMarkIcon className="w-5" />
            </button>
        </div>
    )
}