import { Outlet, useLocation } from "react-router"
import { routes } from "../../config/routes";
import { BreadcrumbsContainer } from "../../core/components/Header";
import { BreadCrumbs } from "../BreadCrumbs";
import { useState } from "react";
import { CreateButton } from "../../core/components/ActionButtons";
import { Modal } from "../../core/components/Box";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CreateCategory } from "./CreateCategory";

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
                                <div className="flex justify-between py-2 px-4 border-b-2 border-gray-500">
                                    <div className="text-sm text-black">Create Category</div>
                                    <button
                                    onClick={() => setShowCreate(false)}
                                    className="text-black hover:text-red-500">
                                        <XMarkIcon className="w-5" />
                                    </button>
                                </div>
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