"use client";
import { Box, Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Question, Questionnaire } from "../../../../interfaces/questionnaire";

export default function Main() {
    const [questionnaire, setQuestionnaire] = useState({});
    function addQuestion(question: Question) {
        setQuestionnaire({ ...questionnaire, question });
    }
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
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button size={"3"} radius="full" className="!text-white">
                            <Flex gap="1" align={"center"}>
                                <IoMdAdd size={25} className=" text-white mr-0" />
                                <Text>Add Question</Text>
                            </Flex>
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>Add Question</Dialog.Title>
                        <Flex align="center" gap="2">
                            <Text>1. Your Question Type</Text>
                            <Select.Root defaultValue="input">
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value="input">
                                        Multiple Choice Questions
                                    </Select.Item>
                                    <Select.Item value="apple">Apple</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        <Flex className="gap-1 !justify-end mt-2">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button>OK</Button>
                            </Dialog.Close>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>
            </Box>
        </Flex>
    );
}
