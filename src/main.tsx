import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createRouter} from "./config/router.tsx";
import {RouterProvider} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={createRouter()}></RouterProvider>
    </React.StrictMode>,
)
