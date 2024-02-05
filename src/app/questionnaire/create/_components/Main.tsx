"use client";
import { Flex, TextField } from "@radix-ui/themes";
import React from "react";

export default function Main() {
    return (
        <Flex className="p-10 sm:p-32" direction={"column"} align={"center"}>
            <textarea
                placeholder="Please enter your title"
                className="[resize:none] !border-none !outline-none h-auto block font-bold !text-2xl sm:!text-4xl w-full text-center"
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                    }
                }}
            ></textarea>
        </Flex>
    );
}
