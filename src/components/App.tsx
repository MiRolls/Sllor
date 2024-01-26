import { RouterProvider } from "react-router-dom";
import { createRouter } from "../config/router";
import "./style.css";

export default () => {
	return (
		<div className="w-full">
			<RouterProvider router={createRouter()}></RouterProvider>
			{/* <h1>111</h1> */}
		</div>
	);
};
