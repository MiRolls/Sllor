import {createBrowserRouter,} from "react-router-dom";
import {Layout, SiteLoader} from "../components/Layout";
import {QuestionnaireLoader, QuestionnairePage} from "../pages/Questionnaire/Index";
import {Document, DocumentLoader} from "../pages/Document";

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
                        path: "/document",
                        element: <Document />,
                        loader: DocumentLoader
                    }
                ]
            }
        ]
    )
}