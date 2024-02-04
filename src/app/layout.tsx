import DataLoader from "@/components/DataLoader";
import "./globals.css";
import { Metadata } from "next";
import getSite from "@/utils/getSite";
import { Site } from "@/interfaces/site";

// getSite and change Metadata and transfer props to DataLoader
export async function generateMetadata(): Promise<Metadata> {
    const siteData: [boolean, Site] = await getSite();
    if (siteData[0]) {
        const site = siteData[1];
        const metadata: Metadata = {
            title: site.name,
            description: site["short-introduce"],
            icons: site.logo,
        };
        return metadata;
    } else {
        return { title: "Sllor" };
    }
}

async function RootLayout({ children }: { children: React.ReactNode }) {
    const siteData = await getSite();
    return (
        <html lang="">
            {/* <head>
                <link rel="icon" href="" id="icon" />
                <title id="title"></title>
            </head>*/}
            <body>
                <DataLoader data={siteData}>{children}</DataLoader>
            </body>
        </html>
    );
}

export default RootLayout;
