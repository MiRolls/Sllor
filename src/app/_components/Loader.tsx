"use client";
import DataLoader from "@/components/DataLoader";
import getSite from "@/utils/getSite";
import React, { useState } from "react";

export default function Loader({ children }: { children: React.ReactNode }) {
    // let data: [boolean, any] | undefined;
    const [data, setData] = useState<[boolean, any] | undefined>(undefined);
    getSite().then(res => {
        setData(res);
    });

    return typeof data !== "undefined" && <DataLoader data={data}> {children}</DataLoader>;
}
