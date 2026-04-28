interface Props {
    children: React.ReactNode;
}

export const ModalButtonsContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex justify-end space-x-3">
            {children}
        </div>
    )
}