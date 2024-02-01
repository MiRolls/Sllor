"use client";
import Markdown from "@/components/Markdown";
import { SiteState, useSite } from "@/store/site";
import { Box } from "@radix-ui/themes";

const About = () => {
    const { site } = useSite() as SiteState;
    return (
        <Box className="p-40">
            <Markdown lazyImage size="lg">
                {site.about}
            </Markdown>
        </Box>
    );
};

export default About;
