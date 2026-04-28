interface Props {
    children?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export const SignInButton: React.FC<Props> = ({onClick, children, disabled}) => {
    return (
        <button className={`
                relative w-full overflow-hidden rounded-md border-2 border-primary-600 px-4 py-2 font-semibold
                transition-all duration-500 ease-in-out
                
                bg-gradient-to-r from-primary-600 via-primary-400 to-primary-100
                bg-[length:300%_100%] bg-[position:100%_0%]
                
                text-primary-600 hover:text-white hover:bg-[position:0%_0%]
                
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:bg-[position:100%_0%] disabled:hover:text-primary-600
            `}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    )
}
