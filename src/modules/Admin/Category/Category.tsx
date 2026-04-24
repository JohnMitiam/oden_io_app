import { Outlet, useLocation } from "react-router"

import { useState } from "react";

import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { CreateCategory } from "./CreateCategory";
import { BreadcrumbsContainer } from "../../../core/components/Header";
import { BreadCrumbs } from "../../BreadCrumbs";
import { CreateButton } from "../../../core/components/ActionButtons";
import { routes } from "../../../config/routes";
import { Modal, PopupHeader } from "../../../core/components/Box";

export const Category = () => {
    const location = useLocation();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const isOnPage = location.pathname === routes.CATEGORY;

    const breadCrumbs = isOnPage
    ? [{ link: "Categories", to: ""}]
    : [{ link: "Categories", to: ""}];

    const [showCreate, setShowCreate] = useState(false)

    const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

    return (
        <>
            <div className="py-2 space-y-8">
                <BreadcrumbsContainer>
                    <div className="flex">
                        <BreadCrumbs links={breadCrumbs} />
                    </div>
                    <CreateButton onClick={() => setShowCreate(true)}>
                        Create Category
                    </CreateButton>

                    {showCreate && (
                        <Modal show={true}>
                            <div className="p-4">
                                <PopupHeader onClose={() => setShowCreate(false)}>
                                    <RectangleStackIcon className="w-5 text-gray-500" />
                                    Create Category
                                </PopupHeader>
                                <CreateCategory loadData={async () => {
                                    handleRefresh();
                                }}
                                onClose={() => setShowCreate(false)} />
                            </div>
                        </Modal>
                    )}
                </BreadcrumbsContainer>
                <Outlet context={{ refreshTrigger }}/>
            </div>
        </>
    )
}