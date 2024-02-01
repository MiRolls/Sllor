"use client";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { BsArrowReturnLeft } from "react-icons/bs";
import showPage from "../config/showPage";
import { SiteState, useSite } from "../store/site";
import { Site } from "../interfaces/site";
import { t } from "i18next";

const IndexTitle = () => {
    const site: Site = useSite(state => (state as SiteState).site);

    return (
        <Flex
            direction="row"
            className="!w-full lg:h-5/6 h-fix lg:mt-0 mt-20 lg:scale-100 scale-110 sm:items-start items-center"
            align="center"
        >
            {/* Main Title */}
            <Flex
                width="100%"
                className="lg:!justify-center lg:!items-center sm:!justify-start"
                height={"100%"}
            >
                <Flex
                    className="sm:ml-20 lg:ml-0 lg:max-w-4/12 sm:max-w-3/5 !items-center sm:p-0 sm:mr-20 p-10 sm:!items-start"
                    direction="column"
                    justify="center"
                >
                    <Box className="!text-[4.5rem] font-bold text-shadow-3xl gradient-white-main shadow-accent-500 ">
                        {site.name}
                    </Box>
                    <Heading className="text-accent-500 sm:text-left text-center">
                        {site["short-introduce"]}
                    </Heading>
                    <Button className="!bg-accent-500 !mt-4 w-fit">
                        {t("Getting Stsarted")} <BsArrowReturnLeft className="stroke-1" />
                    </Button>
                </Flex>
                <Flex className="!hidden lg:!block h-full " justify="center" align="center">
                    {/* Card */}
                    <Flex className="h-full gap-3 py-10 pt-[55px]">
                        <div className="h-full p-2 rounded-lg w-fit bg-accent-500">
                            <iframe
                                src={showPage[0]}
                                className="pointer-events-none h-full"
                            ></iframe>
                        </div>
                        <div className="h-full hidden xl:block p-2 rounded-lg w-fit bg-accent-500">
                            <iframe
                                src={showPage[1]}
                                className="pointer-events-none h-full"
                            ></iframe>
                        </div>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default IndexTitle;
