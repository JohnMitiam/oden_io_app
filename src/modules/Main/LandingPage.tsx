import { useEffect, useState } from "react";
import { productTableDefaultValue, type ProductTableResultViewModel } from "../../models/Product";
import { ProductServices } from "../../services/Products";
import { ListContainer } from "../../core/components/List";
import { ProductCard } from "../../core/components/Card";
import { Paginations } from "../../core/components/Paginations";
import { BreadcrumbsContainer } from "../../core/components/Header";
import { BreadCrumbs } from "../BreadCrumbs";

export const LandingPage = () => {
  const [data, setData] = useState<ProductTableResultViewModel>(productTableDefaultValue);

  const [page, setPage] = useState(1);
  const pageSize = 30;

  const loadData = async () => {
    ProductServices.getList(page, pageSize)
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
  
  const breadCrumbs = [{ link: "Home", to: "/" }];
      
  return (
    <div className="py-2 space-y-8">

      <BreadcrumbsContainer>
        <div className="flex">
          <BreadCrumbs links={breadCrumbs} />
        </div>
      </BreadcrumbsContainer>

      <ListContainer>
        <div className="grid grid-cols-6 gap-5">
          {data.data.length > 0 ? (
            data.data.map((row, index) => (
              <ProductCard
                productImages={row.productImages}
                key={row.id || index}
                name={row.name}
                price={Number(row.price)}
                onClick={() => alert(`Product Id Click! ${row.id}`)}
                onDelete={() => alert(`Delete Product Id! ${row.id}`)}
              />
            ))
          ): (
            <div className="col-span-full py-10 text-center text-gray-400 italic bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-100"> No Products found. </div>
          )}
        </div>
      </ListContainer>

      <Paginations
        dataSource={data}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => prev < (data.totalPages || 1) ? prev + 1 : prev)}
      />
      
    </div>
  );
};