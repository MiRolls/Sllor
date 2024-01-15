// @flow
import {Outlet} from "react-router-dom";
import {Button, Flex, Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import {HiMenu} from "react-icons/hi";
import axios from "axios";

export const SiteLoader = async ()=>{
    const response = await axios.post("/site/get",{})
    return response.data.data
}

export const Layout = () => {
    return (
        <Theme appearance={"dark"} accentColor={"tomato"}>
            <div className={"h-screen w-full"}>
                <Flex className={"items-center bg-accent"} height={"9"} p={"3"}>
                    <Button radius="full"
                            className={"outline-none flex items-center justify-center w-12 h-12"}>
                        <HiMenu className="flex h-10 w-10"/>
                    </Button>
                </Flex>
                <Outlet></Outlet>
            </div>
        </Theme>
    );
};