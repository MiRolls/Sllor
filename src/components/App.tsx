import { RouterProvider } from "react-router-dom";
import { createRouter } from "../config/router";
import "./index.css";

export default () => {
	return <RouterProvider router={createRouter()}></RouterProvider>;
};
