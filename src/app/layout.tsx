import "./globals.css";
import Loader from "./_components/Loader";
import getSite from "@/utils/getSite";

export async function generateMetadata() {
    const site = await getSite();
    if (site[0]) {
        return {
            title: site[1].name,
            description: site[1].introduce,
            icon: site[1].logo,
        };
    } else {
        return {
            title: "Bomb!",
        };
    }
}

async function RootLayout({ children }: { children: React.ReactNode }) {
    const siteData = await getSite();
    return (
        <html>
            <head>
                <link rel="icon" href="" id="icon" />
                <title id="title"></title>
                <meta name="description" content=""></meta>
            </head>
            <body>
                <Loader>{children}</Loader>
            </body>
        </html>
    );
}

export default RootLayout;
