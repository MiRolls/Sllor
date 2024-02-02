"use client";
import { useEffect } from "react";
import { ControlState, useControl } from "@/store/control";
import { HiMenu } from "react-icons/hi";
import { IoCreateOutline, IoCreateSharp } from "react-icons/io5";
import isPhone from "@/utils/isPhone";
import { t } from "i18next";

const QuestionnairePage = () => {
    const changeControl = useControl(state => (state as ControlState).changeControl);
    const clear = useControl(state => (state as ControlState).clear);
    const changeShow = useControl(state => (state as ControlState).changeShow);

    useEffect(() => {
        changeControl([
            {
                type: "choice",
                name: "Mine",
                action: () => {
                    console.log(111);
                },
                icon: <HiMenu />,
            },
            {
                type: "choice",
                name: "choice",
                action: () => {
                    console.log(111);
                },
                icon: <IoCreateOutline />,
            },
            {
                type: "group",
                name: "choice",
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
