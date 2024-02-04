"use client";
import { ReactNode, useEffect } from "react";
import { ControlState, useControl } from "@/store/control";
import isPhone from "@/utils/isPhone";
import { t } from "i18next";
import { FaRegUser } from "react-icons/fa";

const QuestionnairePage = ({ children }: { children: ReactNode }) => {
    const changeControl = useControl(state => (state as ControlState).changeControl);
    const clear = useControl(state => (state as ControlState).clear);
    const changeShow = useControl(state => (state as ControlState).changeShow);

    useEffect(() => {
        changeControl([
            {
                type: "choice",
                name: t("My"),
                icon: <FaRegUser />,
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

    return children;
};

export default QuestionnairePage;
