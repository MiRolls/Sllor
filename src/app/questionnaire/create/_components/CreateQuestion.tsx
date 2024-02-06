"use client";
import { Question, QuestionType } from "@/interfaces/questionnaire";
import { Box, Flex, Select, Text, TextFieldInput } from "@radix-ui/themes";
import { forwardRef, useImperativeHandle, useState } from "react";
import classNames from "../../../../utils/classNames";

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
            {/* Question No.1: Question Type */}
            <Flex align="center" justify={"between"}>
                <Text>2. Title</Text>
                <TextFieldInput></TextFieldInput>
            </Flex>
        </Flex>
    );
});
// to fix the error: "Property 'displayName' is missing in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>' but required in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>'."
CreateQuestion.displayName = "CreateQuestion";

export default CreateQuestion;
