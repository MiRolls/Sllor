import {Button, Flex} from "@radix-ui/themes";
import {HiMenu} from "react-icons/hi";

const NavBar = () => {
    return (
        <Flex className={"items-center bg-accent"} height={"9"} p={"3"}>
            <Button radius="full"
                    className={"outline-none duration-200 flex items-center justify-center w-12 h-12"}>
                <HiMenu className="flex h-10 w-10"/>
            </Button>
        </Flex>
    );
};

export default NavBar;