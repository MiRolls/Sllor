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
			<Box className="leading-5">
				<MarkdownComponent options={markdownConfig}>{children}</MarkdownComponent>
			</Box>
		</Box>
	);
};

export default Markdown;
