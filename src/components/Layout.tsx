// @flow
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { AlertDialog, Box, Button, Flex, Text, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import axios from "axios";
import { SiteGet } from "../interfaces/response/site";
import { useTranslation } from "react-i18next";
import createI18n from "../language";
import changeSite from "../config/changeSite.ts";
import NavBar from "./NavBar.tsx";
import { SiteState, useSite } from "../store/site.ts";
import { Suspense, useEffect } from "react";
import { DarkState, useDark } from "../store/dark.ts";
import Control from "./Control.tsx";
import { Site } from "../interfaces/site";
import { ControlState, useControl } from "../store/control.ts";

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

export const Layout = () => {
	const [t, _] = useTranslation();

	const site: any = useLoaderData();
	const navigation = useNavigation();

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

				<div
					className={
						navigation.state === "loading"
							? "pt-16 opacity-10 w-full grayscale h-full duration-200"
							: "duration-200 pt-16 w-full h-full"
					}
				>
					{/* Control */}
					<Control></Control>
					{show && control.length > 0 && (
						<Box className="md:hidden ml-[80%] w-1/5 h-full" onClick={close}></Box>
					)}
					{/* Main Thing */}
					<div
						className={
							control.length > 0 && show
								? "lg:pl-[20%] md:pl-[33.333333%] duration-200"
								: "duration-200"
						}
					>
						<Suspense>
							<Outlet></Outlet>
						</Suspense>
					</div>
				</div>
			</div>
		</Theme>
	);
};
