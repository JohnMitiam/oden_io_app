import { useEffect, useState } from "react"
import { ListContainer } from "../../core/components/List";
import { ProductCard } from "../../core/components/Card";
import { Paginations } from "../../core/components/Paginations";
import { type ProductTableResultViewModel, productTableDefaultValue } from "../../models/Product";
import { ProductServices } from "../../services/Products";

export const ProductList = () => {
    const [data, setdata] = useState<ProductTableResultViewModel>(productTableDefaultValue);

    const [page, setPage] = useState(1);
    const pageSize = 30;

    const loadData = async () => {
        ProductServices.getList(page, pageSize)
        .then((res) => {
            setdata(res);
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

    return (
        <>
            <ListContainer>
                <div className="grid grid-cols-6 gap-5">
                    {data.data.length > 0 ? (
                        data.data.map((row) => (
                            <ProductCard
                            id={Number(row.id)}
                            price={Number(row.price)}
                            imageData={row.imageData}
                            name={row.name}
                            // description={row.description}
                            onClick={() => alert(`Product Id Click! ${row.id}`)} />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-gray-400 italic bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-100"> No Products found. </div>
                    )}
                </div>
            </ListContainer>

            <Paginations
                dataSource={data}
                onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setPage((prev) => prev < (data.totalPages || 1) ? prev + 1 : prev)} />
        </>
    )
}