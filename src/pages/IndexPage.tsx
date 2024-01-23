import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { SiteState, useSite } from "../store/site";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Site } from "../interfaces/site";
import showPage from "../config/showPage";

const IndexPage = () => {
	const site: Site = useSite(state => (state as SiteState).site);

	return (
		<Box className="h-full overflow-hidden relative ">
			{/* Main Things */}
			<Flex
				direction="row"
				className="!w-full h-5/6 sm:items-start items-center"
				align="center"
			>
				{/* Main Title */}
				<Flex width="100%" height={"100%"} justify={"center"} align={"center"}>
					<Flex
						className="lg:max-w-4/12 sm:max-w-3/5 lg:scale-100 md:scale-110 !items-center sm:p-0 sm:mr-20 p-10 sm:!items-start"
						direction="column"
						justify="center"
					>
						<Box className="!text-[4.5rem] font-bold text-shadow-3xl gradient-white-main shadow-accent-500">
							{site.name}
						</Box>
						<Heading className="text-accent-500 sm:text-left text-center">
							{site["short-introduce"]}
						</Heading>
						<Button className="!bg-accent-400 !mt-4 w-fit">
							Getting Started <BsArrowReturnLeft className="stroke-1" />
						</Button>
					</Flex>
					<Flex className="!hidden xl:!block h-full " justify="center" align="center">
						{/* Background */}
						<Box className="rounded-full absolute right-[-10px] bottom-7 w-96 h-96 scale-[2.3] blur-3xl z-[-1] bg-accent-400A"></Box>
						{/* Card */}
						<Flex className="h-full gap-3 py-10">
							<div className="h-full p-2 rounded-lg w-fit bg-accent-500">
								<iframe src={showPage[0]} className="h-full"></iframe>
							</div>
							<div className="h-full p-2 rounded-lg w-fit bg-accent-500">
								<iframe src={showPage[1]} className="h-full"></iframe>
							</div>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
};

export default IndexPage;
