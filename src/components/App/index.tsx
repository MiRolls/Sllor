import './Index.css'
import {RouterProvider} from "react-router-dom";
import {createRouter} from "../../config/router.tsx";

function Index() {
    return (
        <RouterProvider router={createRouter()}></RouterProvider>
    )
}

export default Index
