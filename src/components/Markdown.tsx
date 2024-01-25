import MarkdownComponent from "markdown-to-jsx";

const Markdown = ({ children }: { children: string }) => {
	return <MarkdownComponent>{children}</MarkdownComponent>;
};

export default Markdown;
