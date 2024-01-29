"use client";
import { Box } from "@radix-ui/themes";
import React from "react";
import "@/style/footer.css";
import { SiteState, useSite } from "@/store/site";
import { Site } from "@/interfaces/site";
import Markdown from "./Markdown";

const Footer = () => {
    const site: Site = useSite(state => (state as SiteState).site);
    return (
        <Box className="relative bg-gradient min-h-[20%]">
            <Markdown
                align="start"
                className="px-24 py-10"
                loadingAnimation={false}
                size="base"
                lazyImage={false}
            >
                {site.footer}
            </Markdown>
        </Box>
    );
};

export default Footer;
