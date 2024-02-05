"use client";
import { ReactNode, useEffect } from "react";
import { useControl, ControlState } from "../../../store/control";

const CreateLayout = ({ children }: { children: ReactNode }) => {
    const originalIsShow = (useControl() as ControlState).show;
    // temp value
    const { changeShow } = useControl() as ControlState;

    useEffect(() => {
        changeShow(false);

        return () => {
            changeShow(originalIsShow);
        };

        // never change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return children;
};

export default CreateLayout;
