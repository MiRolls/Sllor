import DataLoader from "@/components/DataLoader";
import "./globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="">
            <head>
                <link rel="icon" href="" id="icon" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title id="title"></title>
            </head>
            <body>
                <DataLoader>{children}</DataLoader>
            </body>
        </html>
    );
}

export default RootLayout;
