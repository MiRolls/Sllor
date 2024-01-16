// @flow
import {Outlet} from "react-router-dom";
import {Button, Dialog, Flex, Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import {HiMenu} from "react-icons/hi";
import axios from "axios";
import {SiteGet} from "../../interfaces/response/site";
import {useTranslation} from "react-i18next";
import createI18n from "../../language";

export const SiteLoader = async ():Promise<[boolean, {}]> => {

    let data: SiteGet
    try {
        data = await axios.post("/site/get", {})
    } catch (error) {
        return [false, {}]
    }
    // server impossible return ```code !== 200```

    await createI18n(data.data.lang)
    return [true, data.data]
}

export const Layout = () => {
    const [t, _] = useTranslation()

    return (
        <Theme appearance={"light"} accentColor={"tomato"}>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button className={"text-accent"}>something</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Title>{t("")}</Dialog.Title>
                </Dialog.Content>
            </Dialog.Root>

            <div className={"h-screen w-full"}>
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