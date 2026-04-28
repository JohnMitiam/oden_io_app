import { Link, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { routes } from "../../config/routes";
import { OdenLogo } from "../../core/OdenLogo";

export const Header = () => {
    const [activeMenu, setActiveMenu] = useState(localStorage.getItem("activeMenu") || null);

    const location = useLocation();

    const setActiveMenuRoute = (route: any) => {
        if (route === routes.HOME) {
            setActiveMenu("home");
        } else if (route === routes.DASHBOARD) {
            setActiveMenu("dashboard")
        } else if (route === routes.CATEGORY) {
            setActiveMenu("category")
        } else if (route === routes.PRODUCTS) {
            setActiveMenu("products")
        }
    }

    useEffect(() => {
        setActiveMenu(localStorage.getItem("activeMenu") || null);

        setActiveMenuRoute(location.pathname);
    }, [location.pathname]);

    const handleMenuClick = (menu: any) => {
        setActiveMenu(menu);
        localStorage.setItem("activeMenu", menu);
    }

    const activeMenuClass = (menu: any) => 
        activeMenu === menu ?
    "text-primary-500 text-sm border-b border-primary-500 pb-1 font-semibold px-3" :
    "text-white text-sm border-b border-black hover:border-primary-500 hover:text-primary-500 pb-1 font-semibold px-3";

    return (
            <div className="px-24 py-3 bg-black shadow-md">
                <div className="flex justify-between items-center">
                    <Link to="/" >
                        <OdenLogo height="" width="100%" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link onClick={() => handleMenuClick("dashboard")} to={`${routes.DASHBOARD}`} className={`${activeMenuClass("dashboard")}`}>
                            Dashboard
                        </Link>
                        <Link onClick={() => handleMenuClick("category")} to={`${routes.CATEGORY}`} className={`${activeMenuClass("category")}`}>
                            Category
                        </Link>
                        <Link onClick={() => handleMenuClick("products")} to={`${routes.PRODUCTS}`} className={`${activeMenuClass("products")}`}>
                            Products
                        </Link>
                        <button className="cursor-pointer">
                            <ShoppingCartIcon className="text-white w-5 hover:text-primary-500" />
                        </button>
                    </div>
                </div>
            </div>
    )
}