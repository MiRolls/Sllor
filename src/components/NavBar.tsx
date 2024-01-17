import {Button, Flex, Heading} from "@radix-ui/themes";
import {HiMenu} from "react-icons/hi";
import {SiteState, useSite} from "../store/site.ts";
import {DarkState, useDark} from "../store/dark.ts";

const NavBar = () => {
    const site = useSite(state => (state as SiteState).site)

    // Get dark api
    const stateDark = useDark(state => (state as DarkState).dark)
    const changeDark:any = useDark(state => (state as DarkState).changeDark)

    return (
        <Flex className={"items-center bg-accent"} height={"9"} p={"3"}>
            <Button radius="full"
                    className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
                <HiMenu color={stateDark === "dark" ? "white" : "black"} className="flex h-10 w-10"/>
            </Button>
            <Heading color="jade">{site.name}</Heading>
            <Heading>{stateDark}</Heading>
            <Button onClick={changeDark}>111</Button>
        </Flex>
    );
};

export default NavBar;