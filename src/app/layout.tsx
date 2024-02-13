import "./globals.css";
import Loader from "./_components/Loader";

async function RootLayout({ children }: { children: React.ReactNode }) {
    // const siteData = await getSite();
    return (
        <html lang="">
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
