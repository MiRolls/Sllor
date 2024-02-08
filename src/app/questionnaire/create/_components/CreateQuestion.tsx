"use client";
import { Question, QuestionType } from "@/interfaces/questionnaire";
import { Flex } from "@radix-ui/themes";
import { forwardRef, useImperativeHandle, useState } from "react";
import QuestionOption from "./QuestionOption";
import { t } from "i18next";
import { AnimatePresence } from "framer-motion";

const CreateQuestion = forwardRef((_, ref: any) => {
    // a question while dialog is open
    const [tempQuestion, setTempQuestion] = useState({
        type: "radio",
        title: "",
        options: [],
    } as Question);

    function changeTempQuestionType(type: QuestionType) {
        // set the type of the question
        setTempQuestion({ ...tempQuestion, type });
    }
    function changeTempQuestionTitle(event: any) {
        // set the title of the question
        setTempQuestion({ ...tempQuestion, title: event.target.value });
    }
    function changeTempQuestionOptions(event: any) {
        // set the options of the question
        const numberOfOptions: number = event.target.value;
        const options: string[] = [];
        for (let i = 0; i < numberOfOptions; i++) {
            options.push("");
        }
        setTempQuestion({ ...tempQuestion, options });
    }

    // there is a function and a hook, can be used to get the question from the parent component
    function getQuestion(): Question {
        return tempQuestion;
    }
    useImperativeHandle(ref, () => {
        getQuestion;
    });
    return (
        <Flex ref={ref} gap="1" direction={"column"}>
            {/* Questions */}
            {/* Question No.1 Type */}
            {/* <AnimatePresence> */}
            <QuestionOption
                onChange={changeTempQuestionType}
                type={"select"}
                tips={t("1. Type")}
                selectOptions={{
                    radio: t("Single choice"),
                    checkbox: t("Multiple choice"),
                    select: t("Dropdown list"),
                    input: t("Simple explanation"),
                    textarea: t("Long explanation"),
                    slider: t("Slider"),
                }}
                defaultValue="radio"
            ></QuestionOption>
            {/* Question No.2 Title  */}
            <QuestionOption
                type="text"
                onChange={changeTempQuestionTitle}
                tips={t("2. Title")}
                placeholder={t("Awesome Question")}
            ></QuestionOption>
            {/* Question No.3.1 Options */}
            {tempQuestion.type === "radio" ||
            tempQuestion.type === "checkbox" ||
            tempQuestion.type === "select" ? (
                <QuestionOption
                    type="number"
                    onChange={changeTempQuestionOptions}
                    tips={t("3. Number Of Options")}
                    placeholder={"3"}
                ></QuestionOption>
            ) : tempQuestion.type === "slider" ? (
                /* Question No.3.2 Range */
                <QuestionOption
                    onChange={undefined}
                    type={"number"}
                    tips={t("3. Range")}
                ></QuestionOption>
            ) : null}
            {/* </AnimatePresence> */}
        </Flex>
    );
});
// to fix the error: "Property 'displayName' is missing in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>' but required in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>'."
CreateQuestion.displayName = "CreateQuestion";

export default CreateQuestion;
