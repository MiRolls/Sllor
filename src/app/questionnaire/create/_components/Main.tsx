"use client";
import { Box, Button, Callout, Checkbox, Dialog, Flex, RadioGroup, Text } from "@radix-ui/themes";
import { MdErrorOutline } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
    Question,
    Questionnaire,
    RadioCheckboxAndSelect,
} from "../../../../interfaces/questionnaire";
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
    const [isShowError, setIsShowError] = useState(false);

    // add a question to the questionnaire
    function addQuestion() {
        // first, check
        const question: Question = (DialogComponent.current as any).getQuestion();
        if (
            question.type === "checkbox" ||
            question.type === "radio" ||
            question.type === "select"
        ) {
            if (
                typeof question.options === "undefined" ||
                (question.options as string[]).length < 1
            ) {
                // user leaves blank at options question
                console.log(question);
                setIsShowError(true);
                return;
            }
        }
        // the other types of question can leave blank
        console.log(111);
        const tempQuestionnaire = { ...questionnaire };
        tempQuestionnaire.questions.push(question as any);
        setQuestionnaire(tempQuestionnaire);
        console.log(questionnaire);
        setIsDialogOpen(false);
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
    function addOption(questionNumber: number) {
        return (event: any) => {
            const tempQuestionnaire = { ...questionnaire };
            (tempQuestionnaire.questions[questionNumber] as RadioCheckboxAndSelect).options.push(
                ""
            );
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
                                                        <RadioGroup.Item value="any" disabled />
                                                        {/* RadioGroup's value is help react to get the group's value, but we don't need to get it, so we can write any in it */}
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
                                    <Button
                                        variant="soft"
                                        size={"1"}
                                        className="!mt-2"
                                        onClick={addOption(index)}
                                    >
                                        {t("Add Option")}
                                    </Button>
                                </RadioGroup.Root>
                            )}
                            {question.type === "checkbox" && (
                                <>
                                    <Flex gap="1" className="mt-1" direction="column">
                                        {question.options.map((option, optionIndex) => {
                                            return (
                                                <Text
                                                    as="label"
                                                    size="2"
                                                    key={optionIndex + "optionKey"}
                                                >
                                                    <Flex gap="2" align={"center"}>
                                                        <Checkbox disabled />
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
                                    <Button
                                        variant="soft"
                                        size={"1"}
                                        className="!mt-2"
                                        onClick={addOption(index)}
                                    >
                                        {t("Add Option")}
                                    </Button>
                                </>
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
                        <CreateQuestion
                            onInput={() => setIsDialogOpen(false)}
                            ref={DialogComponent}
                        />
                        {/* If user leaves blank */}
                        {isShowError && (
                            <Callout.Root color="red" size="1" className="mt-2">
                                <Callout.Icon>
                                    <MdErrorOutline size={"17"} />
                                </Callout.Icon>
                                <Callout.Text>{t("Do not leave blank")}</Callout.Text>
                            </Callout.Root>
                        )}
                        <Flex className="gap-1 !justify-end mt-2">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    {t("Cancel")}
                                </Button>
                            </Dialog.Close>
                            <Button onClick={addQuestion}>{t("OK")}</Button>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>
            </Box>
        </Flex>
    );
}
