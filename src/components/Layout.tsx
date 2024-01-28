"use server";
import { Theme } from "@radix-ui/themes";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import Control from "./Control";
import NavBar from "./NavBar";
import { Site } from "@/interfaces/site";
import CloseBox from "./CloseBox";
import { ControlData } from "@/interfaces/control";

export default function Layout({
    data,
    children,
    dark,
    control,
    show,
}: {
    children: React.ReactNode;
    data: Site;
    dark: "light" | "dark";
    control: ControlData;
    show: Boolean;
}) {
    const [t, _] = useTranslation();
    // Change useSite api

    // get state dark in zustand

    // show control api

    // create state dark

    return (
        <Theme accentColor={data["main-color"] as any} appearance={dark}>
            {/* Alert Dialog when MiRolls was error */}

            {/* Main of Sllor */}
            <div className={"h-screen w-full"}>
                {/* Flex is NavBar */}
                <NavBar></NavBar>

                <div className="duration-200 pt-16 w-full h-full">
                    {/* Control */}
                    <Control></Control>
                    {show && control.length > 0 && <CloseBox />}
                    {/* Main Thing */}
                    <div
                        className={
                            control.length > 0 && show
                                ? "lg:pl-[20%] h-full md:pl-[33.333333%] duration-200"
                                : "duration-200 h-full"
                        }
                    >
                        <Suspense>{children}</Suspense>
                    </div>
                </div>
            </div>
        </Theme>
    );
}
