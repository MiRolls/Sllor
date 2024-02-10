"use client";
import { Box, Button, Dialog, Flex, RadioGroup, Text, TextFieldInput } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Questionnaire, RadioCheckboxAndSelect } from "../../../../interfaces/questionnaire";
import CreateQuestion from "./CreateQuestion";
import { t } from "i18next";

export default function Main() {
    // global page questionnaire
    const [questionnaire, setQuestionnaire] = useState({
        title: "",
        questions: [],
    } as Questionnaire);
    const DialogComponent = useRef(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // add a question to the questionnaire
    function addQuestion() {
        const question = (DialogComponent.current as any).getQuestion();
        const tempQuestionnaire = { ...questionnaire };
        tempQuestionnaire.questions.push(question);
        setQuestionnaire(tempQuestionnaire);
        console.log(questionnaire);
    }
    function getChangeOption(questionNumber: number, optionNumber: number) {
        return (event: any) => {
            const tempQuestionnaire = { ...questionnaire };
            (tempQuestionnaire.questions[questionNumber] as RadioCheckboxAndSelect).options[
                optionNumber
            ] = event.target.value;
            setQuestionnaire(tempQuestionnaire);
        };
    }
    useEffect(() => {
        console.log(questionnaire);
    }, [questionnaire]);

    return (
        <Flex className="p-10 sm:p-32 min-h-full w-full" direction={"column"} align={"center"}>
            {/* Title */}
            <textarea
                placeholder={t("New Questionnaire")}
                className="[resize:none] bg-transparent !border-none !outline-none h-auto block font-bold !text-3xl sm:!text-4xl w-full text-center"
                onChange={event =>
                    setQuestionnaire({ ...questionnaire, title: event.target.value })
                }
                onKeyDown={event => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                    }
                }}
            />

            {/* 84.5 116 */}
            {/* Render Questions */}
            <Box className="sm:w-4/5 w-11/12 sm:min-h-10 min-h-2 sm:py-10 py-2">
                {questionnaire.questions.map((question, index) => {
                    return (
                        <Box key={index + "questionKey"}>
                            <Text>
                                {index + 1}. {question.title}
                            </Text>
                            {question.type === "radio" && (
                                <RadioGroup.Root>
                                    <Flex gap="1" className="mt-1" direction="column">
                                        {question.options.map((option, optionIndex) => {
                                            return (
                                                <Text
                                                    as="label"
                                                    size="2"
                                                    key={optionIndex + "optionKey"}
                                                >
                                                    <Flex gap="2" align={"center"}>
                                                        <RadioGroup.Item value="1" disabled />
                                                        <input
                                                            className="!outline-none !border-none text-base !bg-transparent"
                                                            placeholder={
                                                                t("Option") +
                                                                " " +
                                                                (optionIndex + 1)
                                                            }
                                                            value={option}
                                                            onChange={getChangeOption(
                                                                index,
                                                                optionIndex
                                                            )}
                                                        ></input>
                                                    </Flex>
                                                </Text>
                                            );
                                        })}
                                    </Flex>
                                    <Button variant="soft" size={"1"} className="!mt-2">
                                        {t("Add Option")}
                                    </Button>
                                </RadioGroup.Root>
                            )}
                        </Box>
                    );
                })}
            </Box>

            {/* Dialog */}
            <Box className="mt-5 block">
                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
