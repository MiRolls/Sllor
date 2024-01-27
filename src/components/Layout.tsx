import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useTranslation } from "react-i18next";
import NavBar from "./NavBar";
import { SiteState, useSite } from "../store/site";
import { Suspense, useEffect } from "react";
import { DarkState, useDark } from "../store/dark";
import Control from "./Control";
import { Site } from "../interfaces/site";
import { ControlState, useControl } from "../store/control";

export const Layout = ({ data, children }: { children: React.ReactNode; data: Site }) => {
    const [t, _] = useTranslation();
    // Change useSite api
    const changeUseSite = useSite(state => (state as any).changeSite);

    const reload = () => location.reload();
    const control = useControl(state => (state as any).control);
    const show = useControl(state => (state as any).show);

    // get state dark in zustand
    const stateDark = useDark(state => (state as any).dark);

    // on mounted
    // changeDark api
    const changeDark: any = useDark(state => (state as any).changeDark);

    // show control api
    const changeShow = useControl(state => (state as any).changeShow);

    function close() {
        changeShow(false);
    }

    useEffect(() => {
        // get localStorage
        const dark = localStorage.getItem("dark");
        if (dark === null) {
            const matches = window.matchMedia("(prefers-color-scheme: dark)").matches;
            changeDark(matches ? "dark" : "light");
        }

        // use dark
        changeDark(dark);

        // init site data
        changeUseSite(data);
    }, [changeDark, changeUseSite, data]);

    // create state dark
    useEffect(() => {
        // set dark in DOM
        document.documentElement.className = `${stateDark}-theme`;
        document.documentElement.style.colorScheme = stateDark;
    }, [stateDark]);

    useEffect(() => {
        function handle() {
            if (window.innerWidth <= 768) {
                changeShow(false);
                // phone, mobile
            }
        }
        // reactive control
        window.addEventListener("resize", handle);
        handle();
        return () => {
            window.removeEventListener("resize", handle);
        };
    }, [changeShow]);

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
                    {show && control.length > 0 && (
                        <Box className="md:hidden ml-[80%] w-1/5 h-full" onClick={close}></Box>
                    )}
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
};
