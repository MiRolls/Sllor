"use client";
import DataLoader from "@/components/DataLoader";
import { Site } from "@/interfaces/site";
import getSite from "@/utils/getSite";
import { Sign } from "crypto";
import React, { useState } from "react";

export default function Loader({
    children,
    data,
}: {
    children: React.ReactNode;
    data?: [boolean, Site];
}) {
    const [gotData, setGotData] = useState<[boolean, any]>();

    if (typeof data === "undefined") {
        getSite().then(res => {
            setGotData(res);
        });
    } else {
        setGotData(data);
    }

    return (
        typeof gotData !== "undefined" && <DataLoader data={gotData as any}> {children}</DataLoader>
    );
}
