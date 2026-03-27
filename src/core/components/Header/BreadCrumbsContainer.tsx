interface Props {
  children?: React.ReactNode;
}

export const BreadcrumbsContainer: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        {children}
      </div>
    </>
  );
};
