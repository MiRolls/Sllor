"use client";
import "@radix-ui/themes/styles.css";
import { useEffect, useState } from "react";
import { Site } from "../interfaces/site";
import axios from "axios";
import { SiteGet } from "@/interfaces/response/site";
import createI18n from "@/language";
import ErrorBox from "./ErrorBox";
import Layout from "./Layout";
import { useSite } from "@/store/site";
import { useDark } from "@/store/dark";
import { useControl } from "@/store/control";

export const SiteLoader = async (): Promise<[boolean, Site | null]> => {
    let data: SiteGet;
    try {
        data = (await axios.post("/site/get", {})).data;
    } catch (error) {
        return [false, null];
    }
    // server impossible return ```code !== 200```
    // Create i18n
    await createI18n(data.data.lang);
    // Change Site
    return [true, data.data];
};

export const DataLoader = ({
    children,
    data,
}: {
    children: React.ReactNode;
    data: [Boolean, Site];
}) => {
    const stateDark = useDark(state => (state as any).dark);
    const [showState, setShowState] = useState("loading");
    const changeUseSite = useSite(state => (state as any).changeSite);
    const changeDark: any = useDark(state => (state as any).changeDark);
    const changeShow = useControl(state => (state as any).changeShow);
    const control = useControl(state => (state as any).control);
    const show = useControl(state => (state as any).show);
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
        if (data[0] === true) {
            createI18n(data[1].lang);
            controlHandle();
            darkHandle();
            changeUseSite(data[1]);
            setShowState("success");
        } else {
            setShowState("error");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set dark in DOM
        document.documentElement.className = `${stateDark}-theme`;
        document.documentElement.style.colorScheme = stateDark;
    }, [stateDark]);

    if (showState === "success") {
        return (
            <Layout data={data[1]} dark={stateDark} control={control} show={show}>
                {children}
            </Layout>
        );
    } else if (showState === "error") {
        return <ErrorBox></ErrorBox>;
    }
    return;
};

export default DataLoader;
