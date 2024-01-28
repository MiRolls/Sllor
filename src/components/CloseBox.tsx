"use client";
import { useControl } from "@/store/control";
import { Box } from "@radix-ui/themes";
import React from "react";

export default function CloseBox() {
    const changeShow = useControl(state => (state as any).changeShow);

    function close() {
        changeShow(false);
    }

    return <Box className="md:hidden ml-[80%] w-1/5 h-full" onClick={close}></Box>;
}
