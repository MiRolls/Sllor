"use client";
import { Layout } from "@/components/Layout";
import changeSite from "@/config/changeSite";
import { SiteGet } from "@/interfaces/response/site";
import { Site } from "@/interfaces/site";
import createI18n from "@/language";
import { useEffect, useState } from "react";
import ErrorBox from "@/components/ErrorBox";
import axios from "axios";
import "./globals.css";

export const SiteLoader = async (): Promise<[boolean, Site | null]> => {
    let data: SiteGet;
    try {
        data = (await axios.post("/site/get", {})).data;
    } catch (error) {
        return [false, null];
    }
    // server impossible return ```code !== 200```
    // Create i18n
    await createI18n(data.data.lang);
    // Change Site
    changeSite(data.data);
    return [true, data.data];
};

function RootLayout({ children }: { children: React.ReactNode }) {
    const [showState, setShowState] = useState("loading");
    const [site, setSite]: any = useState([false, null]);
    useEffect(() => {
        SiteLoader().then(siteData => {
            setSite(siteData);
            if (siteData[0]) {
                // can be show
                setShowState("success");
            } else {
                setShowState("error");
            }
        });
    }, []);

    return (
        <html lang="">
            <head>
                <link rel="icon" href="" id="icon" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title id="title"></title>
            </head>
            <body>
                <div id="root">
                    {showState === "success" && <Layout data={site[1]}>{children}</Layout>}
                    {showState === "error" && <ErrorBox></ErrorBox>}
                </div>
                <noscript>
                    <h1>This site can&apos;t run without JavaScript.</h1>
                </noscript>
            </body>
        </html>
    );
}

export default RootLayout;
