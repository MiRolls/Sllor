import { Box } from "@radix-ui/themes";
import IndexTitle from "../components/IndexTitle";

const IndexPage = () => {
	return (
		<Box className="h-full relative overflow-hidden">
			{/* Title */}
			<IndexTitle />
		</Box>
	);
};

export default IndexPage;
