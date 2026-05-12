import { TrashIcon } from "@heroicons/react/24/outline";
import { OdenLogo } from "../../OdenLogo";
import type { ProductImageViewModel } from "../../../models/Product";

interface Props {
    name: string;
    price: number;
    productImages?: ProductImageViewModel[];
    onClick: () => void;
    onDelete: () => void;
}

export const ProductCard: React.FC<Props> = ({
    name,
    price,
    productImages,
    onClick,
    onDelete
}) => {

    const formattedPrice = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);

   const primaryImage = productImages?.find((img) => img.isPrimary) || productImages?.[0];

    const imgSrc = primaryImage 
        ? `data:${primaryImage.mimeType};base64,${primaryImage.imageData}` 
        : null;

    return (
        <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="border-t border-x border-gray-300 rounded-t-xl py-4 space-y-3 px-2 pb-6 pt-3 h-full">
                <div className="flex justify-center">
                    {imgSrc ? (
                            <img 
                                src={imgSrc} 
                                alt={name} 
                                className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                            />
                        ) : (
                            <div className="w-full h-full opacity-20 grayscale flex items-center justify-center p-8">
                                <OdenLogo width="100%" height="auto" />
                            </div>
                        )}
                </div>
                <div className="text-start space-y-2 px-3">
                    <div className="font-bold text-primary-500 text-base">
                        ${formattedPrice}
                    </div>
                    <div>
                        <div className="font-semibold text-black text-sm whitespace-pre-wrap h-10">  
                            {name}
                        </div>
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