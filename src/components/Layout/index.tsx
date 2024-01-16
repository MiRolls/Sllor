// @flow
import {Outlet, useLoaderData} from "react-router-dom";
import {AlertDialog, Button, Flex, Text, Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import {HiMenu} from "react-icons/hi";
import axios from "axios";
import {SiteGet} from "../../interfaces/response/site";
import {useTranslation} from "react-i18next";
import createI18n from "../../language";
import {Site} from "../../interfaces/site";

export const SiteLoader = async (): Promise<[boolean, {}]> => {

    let data: SiteGet
    try {
        data = (await axios.post("/site/get", {})).data
    } catch (error) {
        return [false, {}]
    }
    // server impossible return ```code !== 200```

    await createI18n(data.data.lang)
    return [true, data]
}

export const Layout = () => {
    const [t, i18n] = useTranslation()

    const site: any = useLoaderData()
    const reload = () => location.reload()

    return (
        <Theme appearance={"light"} accentColor={"tomato"}>
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

            <div className={"h-screen w-full"}>
                <Flex className={"items-center bg-accent"} height={"9"} p={"3"}>
                    <Button radius="full"
                            className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
                        <HiMenu className="flex h-10 w-10"/>
                    </Button>
                    <Text>{i18n.language}</Text>
                </Flex>
                <Outlet></Outlet>
            </div>
        </Theme>
    );
};