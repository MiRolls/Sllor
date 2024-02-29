// "use server";
"use client";
import "@radix-ui/themes/styles.css";
import { Site } from "../interfaces/site";
import ErrorBox from "./ErrorBox";
import Layout from "./Layout";
import { useControl } from "@/store/control";
import { useDark } from "@/store/dark";
import { useEffect, useState } from "react";
import createI18n from "@/language";
import { useSite } from "@/store/site";

export const DataLoader = ({
    children,
    data,
}: {
    children: React.ReactNode;
    data: [boolean, Site | null | string];
}) => {
    const [state, setState] = useState("loading");
    const control = useControl(state => (state as any).control);
    const show = useControl(state => (state as any).show);
    const stateDark = useDark(state => (state as any).dark);
    const changeUseSite = useSite(state => (state as any).changeSite);
    const changeDark: any = useDark(state => (state as any).changeDark);
    const changeShow = useControl(state => (state as any).changeShow);

    const controlHandle = () => {
        const handle = () => {
            if (window.innerWidth <= 768) {
                changeShow(false);
                // phone, mobile
            }
        };
        window.addEventListener("resize", handle);
        handle();
    };
    const darkHandle = () => {
        const dark = localStorage.getItem("dark");
        if (dark === null) {
            const matches = window.matchMedia("(prefers-color-scheme: dark)").matches;
            changeDark(matches ? "dark" : "light");
        }
        changeDark(dark);
    };

    useEffect(() => {
        console.log(data);
        if (data[0] === true) {
            createI18n((data[1] as Site).lang);
            controlHandle();
            darkHandle();
            changeUseSite(data[1]);
            setState("success");
        } else {
            setState("error");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set dark in DOM
        document.documentElement.className = `${stateDark}-theme`;
        document.documentElement.style.colorScheme = stateDark;
    }, [stateDark]);

    if (state === "success") {
        return (
            <>
                {/* <LoadHandle data={data}></LoadHandle> */}
                <Layout data={data[1] as Site} dark={stateDark} control={control} show={show}>
                    {children}
                </Layout>
            </>
        );
    } else if (state === "error") {
        return <ErrorBox></ErrorBox>;
    }
};

export default DataLoader;
