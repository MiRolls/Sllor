"use server";
import IndexTitle from "@/components/IndexTitle";
import { Box } from "@radix-ui/themes";
import "@/style/IndexPage.css";
import Footer from "@/components/Footer";
import MarkdownInIndexPage from "@/components/MarkdownInIndexPage";
import "@/app/special.css";

export default async function Home() {
  return (
    <Box className="relative h-full overflow-x-hidden">
      {/* Title */}
      <IndexTitle></IndexTitle>
      {/* Background */}
      <Box className="fixed bottom-7 right-[-10px] z-[-1] h-96 w-96 scale-[2.3] rounded-full bg-accent-100A blur-3xl md:bg-accent-300A"></Box>
      {/* Introduce */}
      <Box className="p-10 sm:p-20">
        <MarkdownInIndexPage></MarkdownInIndexPage>
      </Box>
      <Footer />
    </Box>
  );
}
