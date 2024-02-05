"use client";
import { Box, Button, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Question } from "../../../../interfaces/questionnaire";

export default function Main() {
    return (
        <Flex className="p-10 sm:p-32 min-h-full w-full" direction={"column"} align={"center"}>
            <textarea
                placeholder="Please enter your title"
                className="[resize:none] !border-none !outline-none h-auto block font-bold !text-2xl sm:!text-4xl w-full text-center"
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                    }
                }}
            />
            <Box className="mt-5 block">
                <Button size={"3"} radius="full" className="!text-white">
                    <Flex gap="1">
                        <IoMdAdd size={25} className=" text-white mr-0" />
                        <Text>Add Question</Text>
                    </Flex>
                </Button>
            </Box>
        </Flex>
    );
}
