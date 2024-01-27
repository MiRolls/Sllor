import { AlertDialog, Box, Button, Flex, Text, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import axios from "axios";
import { SiteGet } from "../interfaces/response/site";
import { useTranslation } from "react-i18next";
import createI18n from "../language";
import changeSite from "../config/changeSite.ts";
import { SiteState, useSite } from "../store/site.ts";
import { Suspense, useEffect } from "react";
import { DarkState, useDark } from "../store/dark.ts";
import Control from "../components/Control.tsx";
import { Site } from "../interfaces/site";
import { ControlState, useControl } from "../store/control.ts";
import NavBar from "../components/NavBar.tsx";

export const SiteLoader = async (): Promise<[boolean, Site | null]> => {
	let data: SiteGet;
	try {
		data = (await axios.post("/site/get", {})).data;
	} catch (error) {
		return [false, null];
	}
	// server impossible return ```code !== 200```

	// Create i18n
	await createI18n(data.data.lang);

	// Change Site
	changeSite(data.data);

	return [true, data.data];
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [t, _] = useTranslation();

	let site: any;
	SiteLoader().then(res => (site = res));

	// Change useSite api
	const changeUseSite = useSite(state => (state as SiteState).changeSite);

	const reload = () => location.reload();
	const control = useControl(state => (state as ControlState).control);
	const show = useControl(state => (state as ControlState).show);

	// get state dark in zustand
	const stateDark = useDark(state => (state as DarkState).dark);

	// on mounted
	// changeDark api
	const changeDark: any = useDark(state => (state as DarkState).changeDark);

	// show control api
	const changeShow = useControl(state => (state as ControlState).changeShow);

	function close() {
		changeShow(false);
	}

	useEffect(() => {
		// get localStorage
		const dark = localStorage.getItem("dark");
		if (dark === null) {
			const matches = window.matchMedia("(prefers-color-scheme: dark)").matches;
			changeDark(matches ? "dark" : "light");
		}

		// use dark
		changeDark(dark);

		// init site data
		changeUseSite(site[1]);
	}, []);

	// create state dark
	useEffect(() => {
		// set dark in DOM
		document.documentElement.className = `${stateDark}-theme`;
		document.documentElement.style.colorScheme = stateDark;
	}, [stateDark]);

	useEffect(() => {
		function handle() {
			if (window.innerWidth <= 768) {
				changeShow(false);
				// phone, mobile
			}
		}
		// reactive control
		window.addEventListener("resize", handle);
		handle();
		return () => {
			window.removeEventListener("resize", handle);
		};
	}, []);
	return (
		<html lang="">
			<head>
				<link rel="icon" href="" id="icon" />
				<title id="title"></title>
			</head>
			<body>
				<div id="root">
					<Theme accentColor={site[1]["main-color"]} appearance={stateDark}>
						{/* Alert Dialog when MiRolls was error */}
						<AlertDialog.Root open={!site[0]}>
							<AlertDialog.Trigger></AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Title>{t("Boom")}</AlertDialog.Title>
								<AlertDialog.Description>
									<Text>{t("Get site return err")}</Text>
								</AlertDialog.Description>
								<Flex mt="4" justify="end">
									<Button onClick={reload}>{t("Try Again")}</Button>
								</Flex>
							</AlertDialog.Content>
						</AlertDialog.Root>

						{/* Main of Sllor */}
						<div className={"h-screen w-full"}>
							{/* Flex is NavBar */}
							<NavBar></NavBar>

							<div className="duration-200 pt-16 w-full h-full">
								{/* Control */}
								<Control></Control>
								{show && control.length > 0 && (
									<Box
										className="md:hidden ml-[80%] w-1/5 h-full"
										onClick={close}
									></Box>
								)}
								{/* Main Thing */}
								<div
									className={
										control.length > 0 && show
											? "lg:pl-[20%] h-full md:pl-[33.333333%] duration-200"
											: "duration-200 h-full"
									}
								>
									<Suspense>{children}</Suspense>
								</div>
							</div>
						</div>
					</Theme>
				</div>
				<noscript>
					<h1>This site can&apos;t run without JavaScript.</h1>
				</noscript>
			</body>
		</html>
	);
}
