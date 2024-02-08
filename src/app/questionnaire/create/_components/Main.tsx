"use client";
import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Question, Questionnaire } from "../../../../interfaces/questionnaire";
import CreateQuestion from "./CreateQuestion";
import { t } from "i18next";

export default function Main() {
    // global page questionnaire
    const [questionnaire, setQuestionnaire] = useState({} as Questionnaire);
    const DialogComponent = useRef(null);

    // add a question to the questionnaire
    function addQuestion() {
        const question = (DialogComponent.current as any).getQuestion();
        const tempQuestionnaire = questionnaire;
        tempQuestionnaire.questions.push(question);
        setQuestionnaire(tempQuestionnaire);
        console.log(questionnaire);
    }

    return (
        <Flex className="p-10 sm:p-32 min-h-full w-full" direction={"column"} align={"center"}>
            <textarea
                placeholder={t("New Questionnaire")}
                className="[resize:none] bg-transparent !border-none !outline-none h-auto block font-bold !text-2xl sm:!text-4xl w-full text-center"
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                    }
                }}
            />

            {/* Dialog */}
            <Box className="mt-5 block">
                <Dialog.Root>
                    <Dialog.Trigger>
                        {/* Button to open dialog */}
                        <Button size={"3"} radius="full" className="!text-white">
                            <Flex gap="1" align={"center"}>
                                <IoMdAdd size={25} className=" text-white mr-0" />
                                <Text>{t("Add Question")}</Text>
                            </Flex>
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>{t("Add Question")}</Dialog.Title>
                        <CreateQuestion ref={DialogComponent} />
                        <Flex className="gap-1 !justify-end mt-2">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    {t("Cancel")}
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button onClick={addQuestion}>{t("OK")}</Button>
                            </Dialog.Close>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>
            </Box>
        </Flex>
    );
}
