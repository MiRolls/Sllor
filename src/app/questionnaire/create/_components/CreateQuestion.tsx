"use client";
import { Question, QuestionType } from "@/interfaces/questionnaire";
import { Flex } from "@radix-ui/themes";
import { forwardRef, useImperativeHandle, useState } from "react";
import QuestionOption from "./QuestionOption";

const CreateQuestion = forwardRef((_, ref: any) => {
    // a question while dialog is open
    const [tempQuestion, setTempQuestion] = useState({} as Question);

    function changeTempQuestionType(type: QuestionType) {
        const tempTempQuestion = tempQuestion;
        tempTempQuestion.type = type;
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
            <QuestionOption
                onChange={undefined}
                type={"select"}
                tips="1. Type"
                selectOptions={{
                    radio: "Single choice",
                    checkbox: "Multiple choice",
                    input: "Text",
                }}
            ></QuestionOption>
        </Flex>
    );
});
// to fix the error: "Property 'displayName' is missing in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>' but required in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>'."
CreateQuestion.displayName = "CreateQuestion";

export default CreateQuestion;
