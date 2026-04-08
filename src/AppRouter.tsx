import { createHashRouter } from "react-router";
import App from "./App";
import { Category, CategoryList } from "./modules/Category";
import { LandingPage } from "./modules/LandingPage";
import { Product } from "./modules/Product/Product";
import { ProductList } from "./modules/Product/ProductList";
import { CreateProduct } from "./modules/Product";
import { DetailsProduct } from "./modules/Product/DetailsProduct";

export const AppRouter = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: "category",
                element: <Category />,
                children: [
                    {
                        index: true,
                        element: <CategoryList />
                    }
                ]
            },
            {
                path: "products",
                element: <Product />,
                children: [
                    {
                    index: true,
                    element: <ProductList />
                    },
                    {
                        path: "create",
                        element: <CreateProduct />
                    },
                    {
                        path: ":id",
                        element: <DetailsProduct />
                    }
                ]
            }
        ]
    }
])