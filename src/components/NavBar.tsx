import { Avatar, Box, Button, DropdownMenu, Flex, Heading, IconButton } from "@radix-ui/themes";
import { HiMenu } from "react-icons/hi";
import { SiteState, useSite } from "../store/site.ts";
import { DarkState, useDark } from "../store/dark.ts";
import { CiDark, CiLight } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { motion } from "framer-motion";
import { useUpdateEffect } from "usehooks-ts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ControlState, useControl } from "../store/control.ts";
import classNames from "../utils/classNames";

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
			<Box>
				<IconButton
					radius="full"
					size="3"
					// className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
					className="duration-200 outline-none"
					onClick={chgShow}
				>
					<HiMenu color={stateDark === "dark" ? "white" : "black"} className="w-6 h-6" />
				</IconButton>
				{/* Just support css */}
				<IconButton size="3" className="opacity-0 sm:!hidden" />
			</Box>
			{/* Site info(Click to go to indexPage) */}
			<Link to="/" className="block">
				{/* Site Logo */}
				<Avatar
					src={site.logo}
					fallback={site.name}
					size="2"
					className={"sm:ml-1"}
				></Avatar>
			</Link>

			<Link to="/" className="ml-2 sm:block sm:ml-3 hidden flex-1">
				{/* Site Name */}
				<Heading>{site.name}</Heading>
			</Link>

			<Box className={"hidden sm:block"}>
				<Link to="/about">
					<Button>{t("About")}</Button>
				</Link>
				<Link to="/questionnaire">
					<Button>{t("Home")}</Button>
				</Link>
			</Box>
			{/* Tool Buttons */}
			<Box className="">
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

				{/* Phone dropdown menu */}
				<Box className="sm:hidden inline">
					<DropdownMenu.Root>
						<IconButton radius="full" size="3" className={"outline-none duration-200"}>
							<IoMdMore className="w-6 h-6 stroke-1" />
						</IconButton>
					</DropdownMenu.Root>
				</Box>
			</Box>
		</Flex>
	);
};

export default NavBar;
