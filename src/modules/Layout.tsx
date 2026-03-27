import { Header } from "./Header";


interface Props {
    children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
        <div className="space-y-4">
                <Header />
            <div className="px-24">{children}</div>
        </div>
        </>
    )
}