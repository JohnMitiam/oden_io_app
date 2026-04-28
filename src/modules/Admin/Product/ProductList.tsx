import { useEffect, useState } from "react"
import { productTableDefaultValue, type ProductTableResultViewModel } from "../../../models/Product";
import { ProductServices } from "../../../services/Products";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DeleteButton } from "../../../core/components/ActionButtons";
import { Modal, PopupHeader } from "../../../core/components/Box";
import { ProductCard } from "../../../core/components/Card";
import { CancelButton } from "../../../core/components/Form";
import { ListContainer } from "../../../core/components/List";
import { Paginations } from "../../../core/components/Paginations";
import { ModalButtonsContainer } from "../../../core/components/Box/ModalButtonsContainer";

export const ProductList = () => {
    const [data, setData] = useState<ProductTableResultViewModel>(productTableDefaultValue);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [showDelete, setShowDelete] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 30;

    const loadData = async () => {
        ProductServices.getMyProducts(page, pageSize)
        .then((res) => {
            setData(res);
            console.log("data: ", res.data);
        })
        .catch((error: any) => {
            console.error("Failed to load products", error);
            alert(`Error: ${error.message}`);
        })
        .finally(() => {
        console.log("Fetch products completed");
        });
    }

    useEffect(() => {
        loadData();
    }, [page])

    const deleteRecord = async (rowId: number) => {
        try {
            const result = await ProductServices.delete(Number(rowId));
            if (result?.isSuccess) {
                setShowDelete(false);
                await loadData();
            }
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    }

    return (
        <>
            <ListContainer>
                <div className="grid grid-cols-6 gap-5">
                    {data.data.length > 0 ? (
                        data.data.map((row, index) => (
                        <ProductCard
                            key={row.id || index}
                            price={Number(row.price)}
                            imageData={row.imageData}
                            name={row.name}
                            onClick={() => alert(`Product Id Click! ${row.id}`)}
                            onDelete={() => {
                                setSelectedId(Number(row.id));
                                setShowDelete(true);
                            }} />
                        ))
                    ) : (
                        <div
                            className="col-span-full py-10 text-center text-gray-400 italic bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-100"> No Products found.
                        </div>
                    )}
                </div>
            </ListContainer>

            <Paginations
                dataSource={data}
                onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setPage((prev) => prev < (data.totalPages || 1) ? prev + 1 : prev)}
            />

            {showDelete && (
                <Modal show={true}>
                    <div className="p-4 space-y-6">
                        <PopupHeader onClose={() => setShowDelete(false)}>
                            <TrashIcon className="w-5 text-red-500" />
                            Delete Product
                        </PopupHeader>

                        <div>
                            <div className="pb-2">
                                This action will permanently remove {data.data.find((item) => item.id === selectedId)?.name || "this Product."}
                            </div>
                            are you sure you want to proceed?
                        </div>

                        <ModalButtonsContainer>
                            <CancelButton onClick={() => setShowDelete(false)}>
                                Cancel
                             </CancelButton>
                            <DeleteButton onClick={() => deleteRecord(selectedId)}>
                                Delete
                            </DeleteButton>
                        </ModalButtonsContainer>
                    </div>
                </Modal>
            )}
        </>
    )
}