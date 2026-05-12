import { QuestionMarkCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Props {
    id: number;
    name: string;
    icon: string;
    description: string;
    onClick: (paramId: number) => void;
    onDelete: (paramId: number) => void;
}

const colors = [
  "hover:bg-gray-200 hover:text-gray-800 hover:[&_svg]:stroke-gray-800",
  "hover:bg-red-200 hover:text-red-800 hover:[&_svg]:stroke-red-800",
  "hover:bg-yellow-200 hover:text-yellow-800 hover:[&_svg]:stroke-yellow-800",
  "hover:bg-green-200 hover:text-green-800 hover:[&_svg]:stroke-green-800",
  "hover:bg-blue-200 hover:text-blue-800 hover:[&_svg]:stroke-blue-800",
  "hover:bg-primary-200 hover:text-primary-800 hover:[&_svg]:stroke-primary-800",
  "hover:bg-pink-200 hover:text-pink-800 hover:[&_svg]:stroke-pink-800",
];

export const CategoryCard: React.FC<Props> = ({
    id,
    name,
    icon,
    description,
    onDelete,
    onClick
}) => {

    const colorClass = colors[id % colors.length];

    return (
        <div onClick={() => onClick(id)} className={`border border-opacity-5 rounded-xl px-3 py-20 shadow-sm space-y-2 transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1 hover:shadow-md group relative overflow-hidden ${colorClass}`}>
            <div className="absolute top-4 right-4 transition-opacity duration-200">
                <button className="flex items-center hover:text-red-500 text-sm text-black space-x-1 font-semibold" onClick={() => onDelete(id)}>
                    <TrashIcon className="w-4" />
                </button>
            </div>
            {icon && icon.length > 0 ? (
  <div className="flex justify-center">
    <div 
      className="[&_svg]:stroke-[1.5] [&_svg]:size-8 [&_svg]:stroke-black [&_svg]:transition-transform hover:[&_svg]:scale-110 flex justify-center rounded-full border p-4" 
      dangerouslySetInnerHTML={{ __html: icon }} 
    />
  </div>
) : (
  <div className="flex justify-center">
    {/* This wrapper uses the exact same classes as the div above */}
    <div className="[&_svg]:stroke-[1.5] [&_svg]:size-8 [&_svg]:stroke-black [&_svg]:transition-transform hover:[&_svg]:scale-110 flex justify-center rounded-full border p-4">
      <QuestionMarkCircleIcon />
    </div>
  </div>
)}
            
            <div className="">
                <div className="font-semibold text-base text-center">{name}</div>
                <div className="font-base text-sm italic text-center">{description}</div>
            </div>
        </div>
    )
}