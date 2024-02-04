"use server";
import IndexTitle from "@/components/IndexTitle";
import { Box } from "@radix-ui/themes";
import "@/style/IndexPage.css";
import Footer from "@/components/Footer";
import MarkdownInIndexPage from "@/components/MarkdownInIndexPage";

export default async function Home() {
    return (
        <Box className="h-full relative overflow-x-hidden">
            {/* Title */}
            <IndexTitle></IndexTitle>
            {/* Background */}
            <Box className="rounded-full fixed right-[-10px] bottom-7 w-96 h-96 scale-[2.3] blur-3xl z-[-1] bg-accent-100A md:bg-accent-300A"></Box>
            {/* Introduce */}
            <Box className="sm:p-20 p-10">
                <MarkdownInIndexPage></MarkdownInIndexPage>
            </Box>
            <Footer />
        </Box>
    );
}
