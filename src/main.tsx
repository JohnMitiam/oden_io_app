import ReactDOM from 'react-dom/client'
import './index.css'
import React from 'react'
import { RouterProvider } from 'react-router'
import { AppRouter } from './AppRouter'
import { AuthProvider } from './contexts/AuthContext'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={AppRouter} />
        </AuthProvider>
    </React.StrictMode>
)
