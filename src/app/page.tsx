"use server";
import IndexTitle from "@/components/IndexTitle";
import { Box } from "@radix-ui/themes";
import Markdown from "@/components/Markdown";
import "@/style/IndexPage.css";

export default async function Home() {
    const string = `# I love Markdown \n\n\n 1231242112 \n\n1231242112 \n\n1231242112 \n\n1231242112 \n\n1231242112 \n\n1231242112 \n\n1231242112 \n\n1231242112 \n\n1231242112 \n\n1231242112 \n\n 1231123r21342q13122214412342rewf324rewfw34wegw34rweg432rwegsfbdtw43gress4w3rt4grew4t3tgresdew恶搞人生问题4俄国人淘宝达人国伟图43俄国人沙特4问题3俄国人是不同的人沟通43俄国人不同的人格问题4个人吧rfgbfdxerfrgbdfregbfgdresfrgbdrsegdesgdbgf242112`;

    return (
        <Box className="h-full relative overflow-x-hidden">
            {/* Title */}
            <IndexTitle></IndexTitle>
            {/* Background */}
            <Box className="rounded-full fixed right-[-10px] bottom-7 w-96 h-96 scale-[2.3] blur-3xl z-[-1] bg-accent-100A md:bg-accent-300A"></Box>
            {/* Introduce */}
            <Box className="p-20">
                <Markdown loadingAnimation={true} className="w-full" size="lg" align="center">
                    {string}
                </Markdown>
            </Box>
        </Box>
    );
}
