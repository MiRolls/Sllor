import DataLoader from "@/components/DataLoader";
import "./globals.css";
import { Metadata } from "next";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="">
            <head>
                <link rel="icon" href="" id="icon" />
                <title id="title"></title>
            </head>
            <body>
                <DataLoader>{children}</DataLoader>
            </body>
        </html>
    );
}

export default RootLayout;
