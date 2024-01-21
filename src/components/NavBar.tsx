import { Avatar, Box, Button, Flex, Heading, IconButton } from "@radix-ui/themes";
import { HiMenu } from "react-icons/hi";
import { SiteState, useSite } from "../store/site.ts";
import { DarkState, useDark } from "../store/dark.ts";
import { CiDark, CiLight } from "react-icons/ci";
import { motion } from "framer-motion";
import { useUpdateEffect } from "usehooks-ts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ControlState, useControl } from "../store/control.ts";

const NavBar = () => {
	const site = useSite(state => (state as SiteState).site);
	const [t, _] = useTranslation();

	// Get dark api
	const stateDark = useDark(state => (state as DarkState).dark);
	const changeDark: any = useDark(state => (state as DarkState).changeDark);

	const changeDarkAndStorage = () => {
		changeDark();
	};

	const changeShow = useControl(state => (state as ControlState).changeShow);

	function chgShow() {
		changeShow();
	}

	useUpdateEffect(() => {
		localStorage.setItem("dark", stateDark);
	}, [stateDark]);

	return (
		<Flex
			className={"items-center bg-accent fixed w-full z-20"}
			justify="between"
			height={"9"}
			p={"3"}
		>
			{/* Menu button */}
			<IconButton
				radius="full"
				size="3"
				// className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
				className="duration-200 outline-none"
				onClick={chgShow}
			>
				<HiMenu color={stateDark === "dark" ? "white" : "black"} className="w-6 h-6" />
			</IconButton>
			<Avatar src={site.logo} fallback={site.name} size="2" className={"sm:ml-1"}></Avatar>
			<Box className="ml-2 sm:block sm:ml-3 hidden flex-1">
				<Heading>{site.name}</Heading>
			</Box>

			<Box className={"hidden sm:block"}>
				<Link to="/about">
					<Button>{t("About")}</Button>
				</Link>
				<Link to="/questionnaire">
					<Button>{t("Home")}</Button>
				</Link>
			</Box>
			<IconButton
				onClick={changeDarkAndStorage}
				radius="full"
				size="3"
				className={"outline-none duration-200"}
			>
				{stateDark === "light" && (
					<motion.div
						exit={{ rotate: 180, scale: 0.9 }}
						initial={{ rotate: 180, scale: 0.9 }}
						animate={{ rotate: 0, scale: 1 }}
					>
						<CiDark
							color={stateDark === "light" ? "black" : "white"}
							className="w-6 h-6 stroke-1"
						/>
					</motion.div>
				)}
				{stateDark === "dark" && (
					<motion.div
						initial={{ rotate: 180, scale: 0.9 }}
						animate={{ rotate: 0, scale: 1 }}
						exit={{ rotate: 180, scale: 0.9 }}
					>
						<CiLight
							color={stateDark === "dark" ? "white" : "black"}
							className="w-6 h-6 stroke-1"
						/>
					</motion.div>
				)}
			</IconButton>
		</Flex>
	);
};

export default NavBar;
