interface Props {
  children?: React.ReactNode;
}

export const ListContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-evenly max-w-full">
      <ul className="space-y-6 w-full">{children}</ul>
    </div>
  );
};
