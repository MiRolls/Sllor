"use client";
import { Question, QuestionType } from "@/interfaces/questionnaire";
import { Flex } from "@radix-ui/themes";
import { forwardRef, useImperativeHandle, useState } from "react";
import QuestionOption from "./QuestionOption";
import { t } from "i18next";

const CreateQuestion = forwardRef((_, ref: any) => {
    // a question while dialog is open
    const [tempQuestion, setTempQuestion] = useState({
        type: "radio",
        title: "",
    } as Question);

    function changeTempQuestionType(type: QuestionType) {
        // set the type of the question
        setTempQuestion({ ...tempQuestion, type });
    }
    function changeTempQuestionTitle(event: any) {
        // set the title of the question
        setTempQuestion({ ...tempQuestion, title: event.target.value });
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
                    onChange={changeTempQuestionTitle}
                    tips={t("3. Number Of Options")}
                    placeholder={"3"}
                ></QuestionOption>
            ) : (
                111
            )}
        </Flex>
    );
});
// to fix the error: "Property 'displayName' is missing in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>' but required in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>'."
CreateQuestion.displayName = "CreateQuestion";

export default CreateQuestion;
