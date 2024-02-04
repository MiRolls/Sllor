"use client";
import { useEffect } from "react";
import { ControlState, useControl } from "@/store/control";
import isPhone from "@/utils/isPhone";
import { t } from "i18next";

const QuestionnairePage = () => {
    const changeControl = useControl(state => (state as ControlState).changeControl);
    const clear = useControl(state => (state as ControlState).clear);
    const changeShow = useControl(state => (state as ControlState).changeShow);

    useEffect(() => {
        changeControl([
            {
                type: "group",
                name: t("Guide"),
            },
            {
                type: "group",
                name: t("Questionnaire"),
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
