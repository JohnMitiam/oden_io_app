import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router";
import { DeleteButton } from "../../../core/components/ActionButtons";
import { Modal, PopupHeader } from "../../../core/components/Box";
import { CategoryCard } from "../../../core/components/Card";
import { CancelButton } from "../../../core/components/Form";
import { ListContainer } from "../../../core/components/List";
import { Paginations } from "../../../core/components/Paginations";
import { type CategoryTableResultViewModel, categoryTableDefaultValue } from "../../../models/Category";
import { CategoryServices } from "../../../services/Category";


export const CategoryList = () => {
    const [categories, setCategories] = useState<CategoryTableResultViewModel>(categoryTableDefaultValue);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [showDelete, setShowDelete] = useState(false);
    const { refreshTrigger } = useOutletContext<{ refreshTrigger: number }>();

    const [page, setPage] = useState(1);
    const pageSize = 15;

    const loadData = async () => {
        CategoryServices.getList(page, pageSize)
        .then((res) => {
            setCategories(res);
            console.log("data: ", res.data);
        })
        .catch((error: any) => {
            console.error("Failed to load categories", error);
            alert(`Error: ${error.message}`);
        })
        .finally(() => {
        console.log("Fetch categories completed");
        });
    }

    useEffect(() => {
        loadData();
    }, [page, refreshTrigger])

    const deleteRecord = async (rowId: number) => {
        try {
            const result = await CategoryServices.delete(Number(rowId));
            if (result?.isSuccess) {
                setShowDelete(false);
                setSelectedId(0);
                await loadData();
            }
        } catch (error) {
            console.error("Error deleting data:", error)
        }
    }

    const handleDelete = (rowId: number) => {
        setSelectedId(rowId);
        setShowDelete(true)
    }

    return (
        <>
            <ListContainer>
                <div className="grid grid-cols-5 gap-5">
                    {categories.data.length > 0 ? (
                        categories.data.map((row) => (
                        <CategoryCard
                        id={Number(row.id)}
                        icon={row.icon}
                        name={row.name}
                        description={row.description}
                        onDelete={() => handleDelete(Number(row.id))}
                        onClick={() => undefined}
                        />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-gray-400 italic bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-100">
                            No Categories found.
                        </div>
                    )}
                </div>
            </ListContainer>

            <Paginations
                dataSource={categories}
                onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setPage((prev) => prev < (categories.totalPages || 1) ? prev + 1 : prev)} />

        {showDelete && (
            <Modal show={true}>
              <div className="p-4 space-y-6">
                <PopupHeader onClose={() => setShowDelete(false)}>
                    <TrashIcon className="w-5 text-red-500" />
                    Delete Category
                </PopupHeader>

                <div>
                  <div className="pb-2">
                    This action will permanently remove "{categories.data.find((item) => item.id === selectedId)?.name || "this Category."}"
                  </div>
                  are you sure you want to proceed?
                </div>

                <div className="flex justify-end space-x-3">
                  <CancelButton onClick={() => setShowDelete(false)}>
                    Cancel
                  </CancelButton>
                  <DeleteButton onClick={() => deleteRecord(selectedId)}>
                    Delete
                  </DeleteButton>
                </div>
              </div>
            </Modal>
        )}
        </>
    )
}