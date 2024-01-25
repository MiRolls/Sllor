import { Box } from "@radix-ui/themes";
import Markdown from "../components/Markdown";
import IndexTitle from "../components/IndexTitle";

const IndexPage = () => {
	return (
		<Box className="h-full relative overflow-hidden">
			{/* Title */}
			<IndexTitle></IndexTitle>
			<Markdown className="w-full" align="center">
				#I love markdown
			</Markdown>
		</Box>
	);
};

export default IndexPage;
