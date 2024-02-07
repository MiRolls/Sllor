"use client";
import { Question, QuestionType } from "@/interfaces/questionnaire";
import { Flex } from "@radix-ui/themes";
import { forwardRef, useImperativeHandle, useState } from "react";
import QuestionOption from "./QuestionOption";
import { t } from "i18next";

const CreateQuestion = forwardRef((_, ref: any) => {
    // a question while dialog is open
    const [tempQuestion, setTempQuestion] = useState({} as Question);

    function changeTempQuestionType(type: QuestionType) {
        const tempTempQuestion = tempQuestion;
        tempTempQuestion.type = type;
        setTempQuestion(tempTempQuestion);
    }
    function changeTempQuestionTitle(title: string) {
        const tempTempQuestion = tempQuestion;
        tempTempQuestion.title = title;
        setTempQuestion(tempTempQuestion);
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
                    input: t("Simple explanation"),
                    textarea: t("Long explanation"),
                    select: t("Dropdown list"),
                    slider: t("Slider"),
                }}
            ></QuestionOption>
            {/* Question No.2 Title  */}
            <QuestionOption
                type="text"
                onChange={changeTempQuestionTitle}
                tips={t("2. Title")}
                placeholder={t("Awesome Question")}
            ></QuestionOption>
        </Flex>
    );
});
// to fix the error: "Property 'displayName' is missing in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>' but required in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>'."
CreateQuestion.displayName = "CreateQuestion";

export default CreateQuestion;
