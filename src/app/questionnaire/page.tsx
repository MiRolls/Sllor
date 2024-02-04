"use client";
import { useEffect } from "react";
import { ControlState, useControl } from "@/store/control";
import isPhone from "@/utils/isPhone";

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
