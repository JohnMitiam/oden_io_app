import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { RouterProvider } from 'react-router'
import { AppRouter } from './AppRouter'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <RouterProvider router={AppRouter} />
    </React.StrictMode>
)
