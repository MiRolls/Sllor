import { Box } from "@radix-ui/themes";
import MarkdownComponent from "markdown-to-jsx";
import markdownConfig from "./markdownConfig";
import "./style.css";

interface MarkdownProps {
    children: string;
    className?: string;
    align?: "center" | "justify" | "left" | "right" | "start" | "end";
    loadingAnimation?: boolean;
    lazyImage?: boolean;
    size?:
        | "base"
        | "xs"
        | "sm"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "6xl"
        | "7xl"
        | "8xl"
        | "9xl";
}

const Markdown = ({ children, className, align, size, loadingAnimation }: MarkdownProps) => {
    const cloneClassName = className + ` text-${align} text-${size}`;
    return (
        <Box className={cloneClassName}>
            <Box className={"leading-4 " + (!loadingAnimation ? "" : "load-animation")}>
                <MarkdownComponent options={markdownConfig}>{children}</MarkdownComponent>
            </Box>
        </Box>
    );
};

export default Markdown;
