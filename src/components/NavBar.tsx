import {Avatar, Box, Flex, Heading, IconButton} from "@radix-ui/themes";
import {HiMenu} from "react-icons/hi";
import {SiteState, useSite} from "../store/site.ts";
import {DarkState, useDark} from "../store/dark.ts";
import {CiDark, CiLight} from "react-icons/ci";

const NavBar = () => {
    const site = useSite(state => (state as SiteState).site)

    // Get dark api
    const stateDark = useDark(state => (state as DarkState).dark)
    const changeDark: any = useDark(state => (state as DarkState).changeDark)

    return (
        <Flex className={"items-center bg-accent "} justify="between" height={"9"} p={"3"}>
            <IconButton radius="full" size="3"
                // className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
                        className="duration-200 outline-none">
                <HiMenu color={stateDark === "dark" ? "white" : "black"} className="w-6 h-6"/>
            </IconButton>
            <Avatar src={site.logo} fallback={site.name} size="2" className={"sm:ml-1"}></Avatar>
            <Box className="ml-2 hidden sm:block sm:ml-3 flex-1"><Heading>{site.name}</Heading></Box>
            <IconButton onClick={changeDark} radius="full" size="3"
                        className={"outline-none duration-200"}>
                {stateDark === "light" &&
                    <CiDark color={stateDark === "light" ? "black" : "white"} className="w-6 h-6 stroke-1"/>}
                {stateDark === "dark" &&
                    <CiLight color={stateDark === "dark" ? "white" : "black"} className="w-6 h-6 stroke-1"/>}
            </IconButton>
        </Flex>
    );
};

export default NavBar;