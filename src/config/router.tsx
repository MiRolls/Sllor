import { createBrowserRouter } from "react-router-dom";
import { Layout, SiteLoader } from "../components/Layout.tsx";
import { QuestionnaireLoader } from "../pages/questionnaire/index.tsx";
import { AboutLoader } from "../pages/about.tsx";
import { lazy } from "react";
// import QuestionnairePage from "../pages/Questionnaire/IndexPage";
export function createRouter(): NonNullable<any> {
	return createBrowserRouter([
		{
			element: <Layout />,
			loader: SiteLoader,
			path: "/",
			children: [
				{
					path: "/questionnaire",
					// element: import("../pages/Questionnaire/IndexPage.tsx"),
					// lazy: () => import("../pages/Questionnaire/IndexPage.tsx"),
					// lazy: () => import("../components/NavBar.tsx"),
					Component: lazy(() => import("../pages/questionnaire/index.tsx")),
					loader: QuestionnaireLoader,
				},
				{
					path: "/about",
					Component: lazy(() => import("../pages/about.tsx")),
					loader: AboutLoader,
				},
				{
					path: "/",
					Component: lazy(() => import("../pages/index.tsx")),
				},
			],
		},
	]);
}
