// @flow
import {Outlet, useLoaderData} from "react-router-dom";
import {AlertDialog, Button, Flex, Text, Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import axios from "axios";
import {SiteGet} from "../../interfaces/response/site";
import {useTranslation} from "react-i18next";
import createI18n from "../../language";
import changeSite from "../../config/changeSite.ts";
import NavBar from "../NavBar.tsx";
import {SiteState, useSite} from "../../store/site.ts";
import {useEffect} from "react";
import {DarkState, useDark} from "../../store/dark.ts";

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

    // Change useSite api
    const changeUseSite = useSite(state => (state as SiteState).changeSite)
    changeUseSite(site[1])

    const reload = () => location.reload()

    // on mounted
    let dark: "dark" | "light" | undefined;
    // changeDark api
    const changeDark = useDark(state => (state as DarkState).changeDark)
    useEffect(() => {
        const matches = window.matchMedia('(prefers-color-scheme: dark)').matches
        dark = matches ? "dark" : "light"

        // on mounted
        changeDark(dark)
    }, [])

    // create state dark
    const stateDark = useDark(state=>(state as DarkState).dark)

    useEffect(() => {
        document.documentElement.className = `${stateDark}-theme`
        document.documentElement.style.colorScheme = stateDark;
    }, [stateDark]);



    return (
        <Theme accentColor={"tomato"} appearance={stateDark}>
            {/* Alert Dialog when MiRolls was error */}
            <AlertDialog.Root open={!site[0]}>
                <AlertDialog.Trigger>
                    {/*<Button className={"text-accent"}>something</Button>*/}
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>{t("Boom")}</AlertDialog.Title>
                    <AlertDialog.Description>
                        <Text>{t("Get site return err")}</Text>
                    </AlertDialog.Description>
                    <Flex mt="4" justify="end">
                        <Button onClick={reload}>
                            Try Again
                        </Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            {/* Main of Sllor */}
            <div className={"h-screen w-full"}>
                {/* Flex is NavBar */}
                <NavBar></NavBar>
                <Button onClick={changeDark as any}></Button>
                <Outlet></Outlet>
            </div>
        </Theme>
    );
};