import { Box } from "@radix-ui/themes";
import Markdown from "../components/Markdown";
import IndexTitle from "../components/IndexTitle";

const IndexPage = () => {
	const string = `# I love Markdown \n\n\n 1231242112 \n\n 1231123r21342q13122214412342rewf324rewfw34wegw34rweg432rwegsfbdtw43gress4w3rt4grew4t3tgresdew恶搞人生问题4俄国人淘宝达人国伟图43俄国人沙特4问题3俄国人是不同的人沟通43俄国人不同的人格问题4个人吧rfgbfdxerfrgbdfregbfgdresfrgbdrsegdesgdbgf242112`;
	return (
		<Box className="h-full relative overflow-x-hidden">
			{/* Title */}
			<IndexTitle></IndexTitle>

			{/* Introduce */}
			<Box className="p-20">
				<Markdown className="w-full" size="lg" align="center">
					{string}
				</Markdown>
			</Box>
		</Box>
	);
};

export default IndexPage;
