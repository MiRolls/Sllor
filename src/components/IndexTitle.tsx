"use client";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { BsArrowReturnLeft } from "react-icons/bs";
import showPage from "../config/showPage";
import { SiteState, useSite } from "../store/site";
import { Site } from "../interfaces/site";
import { t } from "i18next";
import Link from "next/link";

const IndexTitle = () => {
  const site: Site = useSite((state) => (state as SiteState).site);

  return (
    <Flex
      direction="row"
      className="h-fix mt-20 !w-full items-center lg:mt-0 lg:h-5/6 lg:items-start"
      align="center"
    >
      {/* Main Title */}
      <Flex
        width="100%"
        className="sm:!justify-start lg:!items-center lg:!justify-center"
        height={"100%"}
      >
        <Flex
          className="lg:max-w-4/12 sm:max-w-3/5 !items-center p-10 sm:ml-20 sm:mr-20 sm:!items-start sm:p-0 lg:ml-0"
          direction="column"
          justify="center"
        >
          <Box className="text-shadow-3xl gradient-white-main !text-[4.5rem] font-bold shadow-accent-500 ">
            {site.name}
          </Box>
          <Heading className="text-center text-accent-500 sm:text-left">
            {site["short-introduce"]}
          </Heading>
          <Link href={"/questionnaire"}>
            <Button className="!mt-4 w-fit !bg-accent-500">
              {t("Getting Started")} <BsArrowReturnLeft className="stroke-1" />
            </Button>
          </Link>
        </Flex>
        <Flex
          className="!hidden h-full lg:!block "
          justify="center"
          align="center"
        >
          {/* Card */}
          <Flex className="h-full gap-3 py-10 pt-[55px]">
            <div className="h-full w-fit rounded-lg bg-accent-500 p-2">
              <iframe
                src={showPage[0]}
                className="pointer-events-none h-full"
              ></iframe>
            </div>
            <div className="hidden h-full w-fit rounded-lg bg-accent-500 p-2 xl:block">
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
