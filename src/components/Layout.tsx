// @flow
import {Outlet, useLoaderData, useNavigation} from "react-router-dom";
import {AlertDialog, Button, Flex, Text, Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import axios from "axios";
import {SiteGet} from "../interfaces/response/site";
import {useTranslation} from "react-i18next";
import createI18n from "../language";
import changeSite from "../config/changeSite.ts";
import NavBar from "./NavBar.tsx";
import {SiteState, useSite} from "../store/site.ts";
import {useEffect} from "react";
import {DarkState, useDark} from "../store/dark.ts";
import Control from "./Control.tsx";
import {useControl} from "../store/control.ts";

export const SiteLoader = async (): Promise<[boolean, {}]> => {

    let data: SiteGet
    try {
        data = (await axios.post("/site/get", {})).data
    } catch (error) {
        return [false, {}]
    }
    // server impossible return ```code !== 200```

    // Create i18n
    await createI18n(data.data.lang)

    // Change Site
    changeSite(data.data)

    return [true, data.data]
}

export const Layout = () => {
    const [t, _] = useTranslation()

    const site: any = useLoaderData()
    const navigation = useNavigation()

    // Change useSite api
    const changeUseSite = useSite(state => (state as SiteState).changeSite)
    changeUseSite(site[1])

    const control = useControl(state => (state as any).control)

    const reload = () => location.reload()

    // get state dark in zustand
    const stateDark = useDark(state => (state as DarkState).dark)

    // on mounted
    // changeDark api
    const changeDark:any = useDark(state => (state as DarkState).changeDark)
    useEffect(() => {
        // get localstorage
        const dark = localStorage.getItem("dark")
        console.log(dark);
        if (dark === null){
            const matches = window.matchMedia('(prefers-color-scheme: dark)').matches
            changeDark(matches ? "dark" : "light")
        }

        // use dark
        changeDark(dark)
    }, [])

    // create state dark
    useEffect(() => {
        document.documentElement.className = `${stateDark}-theme`
        document.documentElement.style.colorScheme = stateDark;
    }, [stateDark]);

    return (
        <Theme accentColor={site[1]["main-color"]} appearance={stateDark}>
            {/* Alert Dialog when MiRolls was error */}
            <AlertDialog.Root open={!site[0]}>
                <AlertDialog.Trigger>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>{t("Boom")}</AlertDialog.Title>
                    <AlertDialog.Description>
                        <Text>{t("Get site return err")}</Text>
                    </AlertDialog.Description>
                    <Flex mt="4" justify="end">
                        <Button onClick={reload}>
                            {t('Try Again')}
                        </Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            {/* Main of Sllor */}
            <div className={"h-screen w-full"}>
                {/* Flex is NavBar */}
                <NavBar></NavBar>

                <div className={navigation.state === "loading" ? "pt-16 opacity-10 w-full grayscale min-h-screen duration-200" : "duration-200 pt-16 w-full min-h-screen"}>
                    {/* Control */}
                    <Control control={control}></Control>
                    {/* Main Thing */}
                    <Outlet></Outlet>
                </div>
            </div>
        </Theme>
    );
};