"use client";
import { ReactNode, useEffect } from "react";
import { ControlState, useControl } from "@/store/control";
import isPhone from "@/utils/isPhone";
import { t } from "i18next";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoAdd } from "react-icons/io5";

const QUestionnaireLayout = ({ children }: { children: ReactNode }) => {
    const changeControl = useControl(state => (state as ControlState).changeControl);
    const clear = useControl(state => (state as ControlState).clear);
    const changeShow = useControl(state => (state as ControlState).changeShow);
    const router = useRouter();

    useEffect(() => {
        changeControl([
            {
                type: "choice",
                name: t("My"),
                icon: <FiUser />,
                action: () => {
                    router.push("/questionnaire/");
                },
            },
            {
                type: "choice",
                name: t("Create"),
                icon: <IoAdd />,
                action: () => {
                    router.push("/questionnaire/create");
                },
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

export default QUestionnaireLayout;
