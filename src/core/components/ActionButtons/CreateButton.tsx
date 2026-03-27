interface Props {
    onClick?: () => void;
    children?: React.ReactNode;
}

export const CreateButton: React.FC<Props> = ({
    children,
    onClick
}) => {
    return (
        <button onClick={onClick} className="bg-primary-500 flex gap-x-4 text-white font-semibold text-sm items-center shadow-md rounded-md py-2 px-6 cursor-pointer">{children}</button>
    )
}