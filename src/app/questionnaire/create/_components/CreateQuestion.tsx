"use client";
import { Question, QuestionType } from "@/interfaces/questionnaire";
import { Flex, Select, Text } from "@radix-ui/themes";
import { forwardRef, useImperativeHandle, useState } from "react";

const CreateQuestion = forwardRef((_, ref) => {
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
        <>
            <Flex align="center" gap="2">
                {/* Question No.1: Question Type */}
                <Text>1. Your Question Type</Text>
                <Select.Root defaultValue="input" onValueChange={changeTempQuestionType}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Item value="input">Multiple Choice Questions</Select.Item>
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Content>
                </Select.Root>
            </Flex>
        </>
    );
});
// to fix the error: "Property 'displayName' is missing in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>' but required in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>'."
CreateQuestion.displayName = "CreateQuestion";

export default CreateQuestion;
