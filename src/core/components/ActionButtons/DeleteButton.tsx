interface Props {
    onClick: () => void;
    children?: React.ReactNode;
}

export const DeleteButton: React.FC<Props> = ({onClick, children}) => {
    return (
        <div className="items-end grid">
          <button
            className="bg-red-700 shadow-md rounded-md py-2 px-8 text-white font-semibold cursor-pointer"
            onClick={onClick}
          >
            {children}
          </button>
        </div>
    )
}
