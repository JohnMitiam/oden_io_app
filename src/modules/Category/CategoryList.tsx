import { useEffect, useState } from "react"
import { categoryTableDefaultValue, type CategoryListResultViewModel } from "../../models/Category"
import { CategoryServices } from "../../services/Category";
import { ListContainer } from "../../core/components/List";
import { CategoryCard } from "../../core/components/Card";
import { useOutletContext } from "react-router";

export const CategoryList = () => {
    const [categories, setCategories] = useState<CategoryListResultViewModel>(categoryTableDefaultValue);
    const { refreshTrigger } = useOutletContext<{ refreshTrigger: number }>();

    const [page] = useState(1);
    const pageSize = 10;

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
                        onClick={() => undefined}
                        />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-gray-400 italic bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-100"> No Categories found. </div>
                    )}
                </div>
            </ListContainer>
        </>
    )
}