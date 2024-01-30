"use client";
import React from "react";
import Markdown from "./Markdown";
import { SiteState, useSite } from "@/store/site";

export default function MarkdownInIndexPage() {
    const site = useSite(state => (state as SiteState).site);
    return (
        <Markdown loadingAnimation={true} className="w-full" size="lg" align="center">
            {site.introduce}
        </Markdown>
    );
}
