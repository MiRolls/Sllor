// "use client";
import { Theme } from "@radix-ui/themes";
import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useControl } from "@/store/control";
import { useDark } from "@/store/dark";
import Control from "./Control";
import NavBar from "./NavBar";
import { Site } from "@/interfaces/site";
import CloseBox from "./CloseBox";

export default function Layout({ data, children }: { children: React.ReactNode; data: Site }) {
    const [t, _] = useTranslation();
    // Change useSite api

    const control = useControl(state => (state as any).control);
    const show = useControl(state => (state as any).show);

    // get state dark in zustand
    const stateDark = useDark(state => (state as any).dark);

    // show control api

    // create state dark
    useEffect(() => {
        // set dark in DOM
        document.documentElement.className = `${stateDark}-theme`;
        document.documentElement.style.colorScheme = stateDark;
    }, [stateDark]);

    return (
        <Theme accentColor={data["main-color"] as any} appearance={stateDark}>
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
