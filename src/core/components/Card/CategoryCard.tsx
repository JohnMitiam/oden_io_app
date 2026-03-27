interface Props {
    id: number;
    name: string;
    icon: string;
    description: string;
    onClick: (paramId: number) => void;
}

const colors = [
  "hover:bg-gray-200 hover:text-gray-800",
  "hover:bg-red-500 hover:text-white",
  "hover:bg-yellow-200 hover:text-yellow-800",
  "hover:bg-green-200 hover:text-green-800",
  "hover:bg-blue-200 hover:text-blue-800",
  "hover:bg-primary-200 hover:text-primary-800",
  "hover:bg-pink-200 hover:text-pink-800",
];

export const CategoryCard: React.FC<Props> = ({
    id,
    name,
    icon,
    description,
    onClick
}) => {

    const colorClass = colors[id % colors.length];

    return (
        <div onClick={() => onClick(id)} className={`border border-opacity-5 rounded-xl px-3 py-4 shadow-sm space-y-2 transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1 hover:shadow-md ${colorClass}`}>
            <div className="flex justify-center">
            <div className="[&_svg]:stroke-[1.5] [&_svg]:size-6 [&_svg]:transition-transform hover:[&_svg]:scale-110 flex justify-center rounded-full border p-2" dangerouslySetInnerHTML={{ __html: icon }} />
            </div>
            <div className="">
                <div className="font-semibold text-sm text-center">{name}</div>
                <div className="font-base text-xs italic text-center">{description}</div>
            </div>
        </div>
    )
}