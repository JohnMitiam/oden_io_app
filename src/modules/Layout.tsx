import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";
import { Header } from './Admin/Header';
import { auth } from "../firebase/firebase";
import { useAuth } from '../contexts/AuthContext'; // Import your auth hook
import { signOut } from 'firebase/auth';

interface Props {
    children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>; 
    }

    const isAdminView = location.pathname.startsWith('/dashboard') || 
                        location.pathname.startsWith('/products') || 
                        location.pathname.startsWith('/category')
    ;

    const isSellerCentre = location.pathname === '/';

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // navigate("/", { replace: true });
            window.location.href = "/";
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <>
            {/* Top Bar - Always visible or customized */}
            <div className={`${isAuthPage
                ? "fixed"
                : ""} w-full px-24 py-1 bg-primary-400 flex justify-between items-center gap-4 text-xs text-white`}>
                <div className="space-x-3 flex items-center">
                    <Link to="/">
                        {user ? (
                        isAdminView ? (
                            <Link to="/" className="hover:underline">
                                Exit to Storefront
                            </Link>
                        ) : (
                            <Link to="/dashboard" className="hover:underline">
                                Go to Admin Dashboard
                            </Link>
                        )
                    ) : (
                        <Link to={isAuthPage ? "/" : "/login"}
                            state={{ from: "/dashboard" }}
                            className="hover:underline">
                            Visit Storefront
                        </Link>
                    )}
                    </Link>
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
                    {user? (
                        <div>
                            Hello <b>{user.displayName
                            ? user.displayName.split(' ')[0]
                            : ''}!</b>
                        </div>
                    ) : null}

                    <button className="flex space-x-0.5 items-center hover:text-gray-300">
                        <QuestionMarkCircleIcon className="w-4" />
                        <p>Help</p>
                    </button>

                    {/* Show Log In or Log Out based on auth state */}
                    {user ? (
                        <button onClick={handleLogout}
                            className="font-semibold px-3 py-1 border-b border-white transition duration-300 cursor-pointer"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link to="/login" className="font-semibold px-3 py-1 border-b border-white transition duration-300 cursor-pointer">
                            Log In
                        </Link>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                {user && !isSellerCentre && <Header />}
                
                <div className={isAuthPage
                    ? "px-0 items-center"
                    : "px-20"}
                    style={isAuthPage
                        ? { 
                            backgroundColor: '#f3f4f6',
                            backgroundImage: `linear-gradient(rgba(243, 244, 246, 0.05), rgba(243, 244, 246, 0.05)), 
                              url('https://images.pexels.com/photos/9789216/pexels-photo-9789216.jpeg?_gl=1*152m5y3*_ga*MTMwNjI1MTA2My4xNzc3NDY4Mjkx*_ga_8JE65Q40S6*czE3Nzc0NjgyOTAkbzEkZzEkdDE3Nzc0Njg2OTEkajI2JGwwJGgw')
                              `,
                            backgroundSize: 'cover', 
                            backgroundRepeat: 'no-repeat',
                        } : {}}
                    >
                    {children}
                </div>
            </div>
        </>
    )
}