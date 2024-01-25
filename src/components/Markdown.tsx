import { Box } from "@radix-ui/themes";
import MarkdownComponent from "markdown-to-jsx";
import markdownConfig from "../config/markdownConfig";

interface MarkdownProps {
	children: string;
	className?: string;
	align?: "center" | "justify" | "left" | "right" | "start" | "end";
	loadAnimation?: boolean;
	lazyImage?: boolean;
}

const Markdown = ({ children, className, align }: MarkdownProps) => {
	const cloneClassName = className + ` text-${align}`;
	return (
		<Box className={cloneClassName}>
			<MarkdownComponent options={markdownConfig}>{children}</MarkdownComponent>
		</Box>
	);
};

export default Markdown;
