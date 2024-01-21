import { Box, Flex, Heading } from "@radix-ui/themes";
import { SiteState, useSite } from "../store/site";
import { Site } from "../interfaces/site";

const IndexPage = () => {
	const site: Site = useSite(state => (state as SiteState).site);

	return (
		<Box className="h-full">
			<Flex direction="column" className="h-5/6" align="center" justify="center">
				{/* Main Title */}
				<Heading>{site.name}</Heading>
			</Flex>
		</Box>
	);
};

export default IndexPage;
