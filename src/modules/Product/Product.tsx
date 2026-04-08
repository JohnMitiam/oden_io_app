import { Outlet, useLocation, useNavigate } from "react-router"
import { routes } from "../../config/routes";
import { BreadcrumbsContainer } from "../../core/components/Header";
import { BreadCrumbs } from "../BreadCrumbs";
import { CreateButton } from "../../core/components/ActionButtons";

export const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isOnPage = location.pathname === routes.PRODUCTS;

    const breadCrumbs = isOnPage
    ? [{ link: "Products", to: routes.PRODUCTS }]
    : [{ link: "Products", to: routes.PRODUCTS},
        { link: "Create Product", to: `${routes.PRODUCTS}/create` }
    ];

    return (
        <>
            <div className="py-2 space-y-8">
                <BreadcrumbsContainer>
                    <div className="flex">
                        <BreadCrumbs links={breadCrumbs} />
                    </div>
                    {isOnPage && (
                        <CreateButton onClick={() => navigate(`${routes.PRODUCTS}/create`)}>
                            Create Product
                        </CreateButton>
                    )}
                </BreadcrumbsContainer>
                <Outlet />
            </div>
        </>
    )
}