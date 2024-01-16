// @flow
import {Outlet, useLoaderData} from "react-router-dom";
import {AlertDialog, Button, Flex, Text, Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import {HiMenu} from "react-icons/hi";
import axios from "axios";
import {SiteGet} from "../../interfaces/response/site";
import {useTranslation} from "react-i18next";
import createI18n from "../../language";
import changeSite from "../../config/changeSite.ts";

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
    return [true, data]
}

export const Layout = () => {
    const [t, _] = useTranslation()

    const site: any = useLoaderData()
    document.documentElement.lang = site[1].lang
    const reload = () => location.reload()

    return (
        <Theme appearance={"light"} accentColor={"tomato"}>
            {/* Alert Dialog when MiRolls was error */}
            <AlertDialog.Root open={ !site[0] }>
                <AlertDialog.Trigger >
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
                <Flex className={"items-center bg-accent"} height={"9"} p={"3"}>
                    <Button radius="full"
                            className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
                        <HiMenu className="flex h-10 w-10"/>
                    </Button>
                </Flex>
                <Outlet></Outlet>
            </div>
        </Theme>
    );
};