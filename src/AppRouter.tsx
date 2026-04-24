import { createHashRouter, Navigate, Outlet } from "react-router";
import App from "./App";
import {
    Category,
    CategoryList
} from "./modules/Admin/Category";
import { Dashboard } from "./modules/Admin/Dashboard";
import {
    Product,
    ProductList,
    CreateProduct,
    DetailsProduct
} from "./modules/Admin/Product";
import { useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./modules/Main/LandingPage";
import { AdminRoute } from "./AdminRoute";
import { Login } from "./modules/Login";
import { Signup } from "./modules/Signup";

interface AppRouterProps {
    children?: React.ReactNode;
}

const AuthConditional: React.FC<AppRouterProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <>Loading...</>;

  if (user) {
    return <Navigate to="/" replace />; 
  }

  return <>{children}</>;
};

export const AppRouter = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // Guest Routes
            {
                index: true,
                element: (
                    <LandingPage />
                )
            },
            {
                path: "login",
                element:
                <AuthConditional>
                    <Login switchMode={() => window.location.hash = "#/signup"} />
                </AuthConditional>
            },{
                path: "signup",
                element:
                <AuthConditional>
                    <Signup switchMode={() => window.location.hash = "#/login"} />
                </AuthConditional>
            },

            // Admin Routes
            {
                // path: "admin",
                element: (
                    <AdminRoute>
                        <Outlet />
                    </AdminRoute>
                ),
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
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
        ]
    }
    
])