import {Button, Flex, Heading} from "@radix-ui/themes";
import {HiMenu} from "react-icons/hi";
import {SiteState, useSite} from "../store/site.ts";
import {DarkState, useDark} from "../store/dark.ts";

const NavBar = () => {
    const site = useSite(state => (state as SiteState).site)

    // Get dark api
    const dark = useDark(state => (state as DarkState).dark)

    return (
        <Flex className={"items-center bg-accent"} height={"9"} p={"3"}>
            <Button radius="full"
                    className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
                <HiMenu className="flex h-10 w-10"/>
            </Button>
            <Heading color="jade">{site.name}</Heading>
            <Heading>{dark}</Heading>
        </Flex>
    );
};

export default NavBar;