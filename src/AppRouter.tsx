import { createHashRouter } from "react-router";
import App from "./App";
import { Category, CategoryList } from "./modules/Category";
import { LandingPage } from "./modules/LandingPage";

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
            }
        ]
    }
])