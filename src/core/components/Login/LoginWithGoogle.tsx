interface Props {
    children?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export const LoginWithGoogle: React.FC<Props> = ({onClick, children, disabled}) => {
    return (
      <button
        className={`
                relative w-full overflow-hidden border-2 w-full rounded-md border-black px-4 py-2 font-semibold
                transition-all duration-500 ease-in-out
                
                bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]
                bg-[length:400%_400%] bg-[position:100%_0%]
                
                text-black hover:text-white hover:bg-[position:0%_0%] hover:border-transparent
                
                disabled:opacity-50 disabled:cursor-not-allowed
            `}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
}
