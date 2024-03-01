"use client";
import { Box, Button, Callout, Checkbox, Dialog, Flex, RadioGroup, Text } from "@radix-ui/themes";
import { MdErrorOutline, MdKeyboardArrowDown } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
    Question,
    Questionnaire,
    RadioCheckboxAndSelect,
} from "../../../../interfaces/questionnaire";
import CreateQuestion from "./CreateQuestion";
import { t } from "i18next";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function Main() {
    // global page questionnaire
    const [questionnaire, setQuestionnaire] = useState({
        title: "",
        questions: [],
    } as Questionnaire);
    const DialogComponent = useRef(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isShowError, setIsShowError] = useState(false);
    const [showSelectContentNumber, setShowSelectContentNumber] = useState(-1);

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
                (DialogComponent.current as any).cleanTempQuestion();
                return;
            }
        }
        // the other types of question can leave blank
        const tempQuestionnaire = { ...questionnaire };
        tempQuestionnaire.questions.push(question as any);
        setQuestionnaire(tempQuestionnaire);
        // console.log(questionnaire);
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
    function showSelectContent(questionNumber: number) {
        return (event: any) => {
            setShowSelectContentNumber(questionNumber);
        };
    }
    function changeQuestionTitle(questionNumber: number) {
        return (event: any) => {
            const tempQuestionnaire = { ...questionnaire };
            tempQuestionnaire.questions[questionNumber].title = event.target.value;
            setQuestionnaire(tempQuestionnaire);
        };
    }

    useEffect(() => {
        // console.log(questionnaire);
    }, [questionnaire]);

    useEffect(() => {
        setIsShowError(false);
    }, [isDialogOpen]);

    return (
        <Flex className="p-10 sm:p-32 min-h-full w-full" direction={"column"} align={"center"}>
            {/* Title */}
            <textarea
                placeholder={t("New Questionnaire")}
                className="[resize:none] bg-transparent !border-none !outline-none !h-[90px] block font-bold !text-3xl sm:!text-4xl w-full text-center"
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
                        <Box key={index + "questionKey"} className="mt-3">
                            <Flex>
                                <Text className="select-none">{index + 1}.</Text>
                                <textarea
                                    className="[resize:none] bg-transparent !border-none !outline-none h-8 w-11/12"
                                    value={question.title}
                                    onChange={changeQuestionTitle(index)}
                                ></textarea>
                            </Flex>

                            {question.type === "radio" && (
                                <>
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
                                </>
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
                            {question.type === "select" && (
                                <Box>
                                    <Button variant="soft" onClick={showSelectContent(index)}>
                                        {question.options[0] === ""
                                            ? t("Option") + " 1"
                                            : question.options[0]}
                                        <MdKeyboardArrowDown />
                                    </Button>
                                    {/* act as select.content */}
                                    <AnimatePresence>
                                        {showSelectContentNumber === index && (
                                            <>
                                                <Box
                                                    className="w-full left-0 top-0  absolute h-screen z-10 bg-transparent"
                                                    onClick={showSelectContent(-1)}
                                                ></Box>
                                                <motion.div
                                                    className="origin-top-left absolute rounded-sm ml-1 p-2 mt-[-30px] z-20 shadow-xl bg-background"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.075 }}
                                                >
                                                    {question.options.map((option, optionIndex) => {
                                                        return (
                                                            <Box
                                                                key={optionIndex + "optionKey"}
                                                                className="pl-2"
                                                            >
                                                                {/* {option} */}
                                                                <input
                                                                    className={`outline-none border-none h-[15px] !text-[14px] !bg-transparent useInput${index}`}
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
                                                            </Box>
                                                        );
                                                    })}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </Box>
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
                        <Button size={"3"} radius="full" className="!bg-accent-700 !text-white">
                            <Flex gap="1" align={"center"}>
                                <IoMdAdd size={25} className=" text-white mr-0" />
                                <Text>{t("Add Question")}</Text>
                            </Flex>
                        </Button>
                    </Dialog.Trigger>
                    <LayoutGroup>
                        <Dialog.Content>
                            <Dialog.Title>{t("Add Question")}</Dialog.Title>
                            <CreateQuestion
                                onInput={() => setIsDialogOpen(false)}
                                ref={DialogComponent}
                            />
                            {/* If user leaves blank */}
                            <AnimatePresence>
                                {isShowError && (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0.7, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                    >
                                        <Callout.Root color="red" size="1" className="mt-2">
                                            <Callout.Icon>
                                                <MdErrorOutline size={"17"} />
                                            </Callout.Icon>
                                            <Callout.Text>{t("Do not leave blank")}</Callout.Text>
                                        </Callout.Root>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Flex className="gap-1 !justify-end mt-2">
                                <Dialog.Close>
                                    <Button variant="surface" color="gray">
                                        {t("Cancel")}
                                    </Button>
                                </Dialog.Close>
                                <Button onClick={addQuestion}>{t("OK")}</Button>
                            </Flex>
                        </Dialog.Content>
                    </LayoutGroup>
                </Dialog.Root>
            </Box>
        </Flex>
    );
}
