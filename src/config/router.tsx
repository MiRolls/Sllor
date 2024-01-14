import {createBrowserRouter,} from "react-router-dom";
import {Layout, SiteLoader} from "../components/Layout";

export function createRouter(): NonNullable<any> {
    return createBrowserRouter(
        [
            {
                element: <Layout />,
                loader: SiteLoader,
                path: "/"
            }
        ]
    )
}