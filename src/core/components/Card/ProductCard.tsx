import { TrashIcon } from "@heroicons/react/24/outline";
import { OdenLogo } from "../../OdenLogo";

interface Props {
    name: string;
    price: number;
    imageData?: string;
    onClick: () => void;
    onDelete: () => void;
}

export const ProductCard: React.FC<Props> = ({
    name,
    price,
    imageData,
    onClick,
    onDelete
}) => {

    const formattedPrice = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);

    return (
        <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="border-t border-x border-gray-300 rounded-t-xl py-4 space-y-3">
            <div className="mx-3 overflow-hidden rounded-lg bg-gray-50">
                <div className="flex justify-center p-2 h-48">
                    {imageData ? (
                        <img 
                        src={imageData} 
                        alt={name} 
                        className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <span className="text-gray-400 text-sm italic grid items-center">
                <OdenLogo width="100%" height="" />
            </span>
          )}
                </div>
            </div>
            <div className="text-start space-y-2 px-3">
                <div className="font-bold text-primary-500 text-base">${formattedPrice}</div>
                <div>
                    <div className="font-semibold text-black text-sm whitespace-pre-wrap">{name}</div>
                    {/* <div className="font-base text-xs italic">{description}</div> */}
                </div>
            </div>
            </div>

            <div className="flex">
                <button onClick={() => onClick()} className="w-full rounded-bl-xl py-2 font-semibold text-xs bg-primary-500 text-white cursor-pointer hover:bg-primary-600">View</button>
                <button onClick={() => onDelete()} className="w-full rounded-br-xl py-2 font-semibold text-xs bg-red-500 text-black flex items-center justify-center space-x-1 cursor-pointer">
                    <TrashIcon className="w-4" /><span>Delete</span>
                </button>
            </div>
        </div>
    )
}