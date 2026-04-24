import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { Header } from './Admin/Header';


interface Props {
    children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
        <div className="px-24 py-1 bg-primary-400 flex justify-between items-center gap-4 text-xs text-white">
            <div className="space-x-3 flex items-center">
                    <Link to="#">
                        Exit to Storefront
                    </Link>
                    {/*or Seller Centre */}
                <div>|</div>
                 <div className="flex space-x-1 items-center">
                    <div>Follow us on</div>
                    <Link to="https://www.facebook.com/" title="Facebook" className="hover:text-blue-500">
                        <FontAwesomeIcon icon={faFacebook}/>
                    </Link>
                    <Link to="https://www.instagram.com/" title="Instagram" className="hover:text-pink-500">
                        <FontAwesomeIcon icon={faInstagram}/>
                    </Link>
                </div>
            </div>
            <div className="flex space-x-2 items-center">
                <button className="flex space-x-0.5 items-center hover:text-gray-300">
                    <QuestionMarkCircleIcon className="w-4" />
                    <p>Help</p>
                </button>
                <button className="font-semibold px-3 py-1 border-b border-transparent hover:border-white transition duration-300 cursor-pointer">
                    Log In
                    {/* Log Out */}
                </button>
            </div>
        </div>
        <div className="space-y-4">
                <Header />
            <div className="px-24">{children}</div>
        </div>
        </>
    )
}