"use client";
import { useEffect } from "react";
import { ControlState, useControl } from "@/store/control";
import { HiMenu } from "react-icons/hi";
import { IoCreateOutline, IoCreateSharp } from "react-icons/io5";
import isPhone from "@/utils/isPhone";
import { t } from "i18next";
import { P } from "@/components/Markdown/children/Text";

const QuestionnairePage = () => {
    const changeControl = useControl(state => (state as ControlState).changeControl);
    const clear = useControl(state => (state as ControlState).clear);
    const changeShow = useControl(state => (state as ControlState).changeShow);

    useEffect(() => {
        changeControl([
            {
                type: "group",
                name: "Guide",
            },
            {
                type: "group",
                name: "Mine",
            },
            {
                type: "group",
                name: "Create",
            },
            {
                type: "group",
                name: "Answer",
            },
        ]);
        return () => {
            clear();
            if (!isPhone()) {
                // isn't phone
                changeShow(true);
            }
        };
    }, [changeControl, changeShow, clear]);

    return <div>111</div>;
};

export default QuestionnairePage;
