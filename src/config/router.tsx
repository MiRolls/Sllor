import {createBrowserRouter,} from "react-router-dom";
import {Layout, SiteLoader} from "../components/Layout.tsx";
import {QuestionnaireLoader, QuestionnairePage} from "../pages/Questionnaire/IndexPage.tsx";
import {About, AboutLoader} from "../pages/About.tsx";

export function createRouter(): NonNullable<any> {
    return createBrowserRouter(
        [
            {
                element: <Layout />,
                loader: SiteLoader,
                path: "/",
                children: [
                    {
                        path: "/questionnaire",
                        element: <QuestionnairePage />,
                        loader: QuestionnaireLoader
                    },
                    {
                        path: "/about",
                        element: <About />,
                        loader: AboutLoader
                    }
                ]
            }
        ]
    )
}