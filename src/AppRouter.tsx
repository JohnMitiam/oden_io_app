import { createHashRouter } from "react-router";
import App from "./App";
import {
    Category,
    CategoryList
} from "./modules/Admin/Category";
import { LandingPage } from "./modules/Admin/LandingPage";
import {
    Product,
    ProductList,
    CreateProduct,
    DetailsProduct
} from "./modules/Admin/Product";

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