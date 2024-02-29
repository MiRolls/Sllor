import "./globals.css";
import Loader from "./_components/Loader";
import getSite from "@/utils/getSite";
import DataLoader from "@/components/DataLoader";
import { Site } from "@/interfaces/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const site = await getSite();
    // console.log(site);
    if (site[0]) {
        return {
            title: site[1].name,
            description: site[1]["short-introduce"],
            icons: site[1].logo,
        };
    } else {
        return {
            title: "Bomb!",
        };
    }
}

async function RootLayout({ children }: { children: React.ReactNode }) {
    const isGetData = true;
    const siteData: [boolean, Site | string | null] = await getSite();

    return (
        <html>
            {/* <head> */}
            {/* <link rel="icon" href="" id="icon" /> */}
            {/* <title id="title"></title> */}
            {/* <meta name="description" content=""></meta> */}
            {/* </head> */}
            <body>
                {isGetData ? (
                    <DataLoader data={siteData}>{children}</DataLoader>
                ) : (
                    <Loader>{children}</Loader>
                )}
                {/* {children} */}
            </body>
        </html>
    );
}

export default RootLayout;
