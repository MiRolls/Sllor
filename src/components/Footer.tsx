"use client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import "@/style/footer.css";
import { SiteState, useSite } from "@/store/site";
import { Site } from "@/interfaces/site";
import Markdown from "./Markdown";

const Footer = () => {
    const site: Site = useSite(state => (state as SiteState).site);
    return (
        <Flex
            className="relative bg-gradient min-h-[50%] lg:min-h-[30%]"
            direction={"column"}
            justify={"center"}
        >
            <Markdown
                align="start"
                className="sm:px-24 px-6 py-10"
                loadingAnimation={false}
                size="base"
                lazyImage={false}
            >
                {site.footer}
            </Markdown>
        </Flex>
    );
};

export default Footer;
