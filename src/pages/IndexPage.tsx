import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { SiteState, useSite } from "../store/site";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Site } from "../interfaces/site";

const IndexPage = () => {
	const site: Site = useSite(state => (state as SiteState).site);

	return (
		<Box className="h-full">
			<Flex direction="column" className="h-5/6" justify="center">
				{/* Main Title */}
				<Box className="max-w-2/5 ml-20">
					<Box className="!text-[4.5rem] font-bold text-shadow-3xl gradient-white-main shadow-accent-500">
						{site.name}
					</Box>
					<Heading className="text-accent-500 ">{site["short-introduce"]}</Heading>
					<Button className="!bg-accent-400 !mt-4 w-fit">
						Getting Started <BsArrowReturnLeft className="stroke-1" />
					</Button>
				</Box>
			</Flex>
		</Box>
	);
};

export default IndexPage;
