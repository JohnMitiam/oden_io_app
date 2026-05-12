interface Props {
    children?: React.ReactNode;
}

export const FormsButtonContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex justify-end space-x-3 py-5">
            {children}
        </div>
    )
}