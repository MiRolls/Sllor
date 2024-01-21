import { createBrowserRouter } from "react-router-dom";
import { Layout, SiteLoader } from "../components/Layout.tsx";
import { QuestionnaireLoader } from "../pages/Questionnaire/IndexPage.tsx";
import { AboutLoader } from "../pages/About.tsx";
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
					Component: lazy(() => import("../pages/Questionnaire/IndexPage.tsx")),
					loader: QuestionnaireLoader,
				},
				{
					path: "/about",
					Component: lazy(() => import("../pages/About.tsx")),
					loader: AboutLoader,
				},
				{
					path: "/",
					Component: lazy(() => import("../pages/IndexPage.tsx")),
				},
			],
		},
	]);
}
