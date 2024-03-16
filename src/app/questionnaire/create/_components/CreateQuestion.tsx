"use client";
import { Question, QuestionType } from "@/interfaces/questionnaire";
import { Flex } from "@radix-ui/themes";
import { t } from "i18next";
import { forwardRef, useImperativeHandle, useState } from "react";
import QuestionOption from "./QuestionOption";
import { AnimatePresence } from "framer-motion";
interface createQuestionProps {
  onInput: () => void;
}

const CreateQuestion = forwardRef(({ onInput }: createQuestionProps, ref: any) => {
  // a question while dialog is open
  const [tempQuestion, setTempQuestion] = useState({
    type: "radio",
    title: "",
    // options: [],
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
  function changeRangeStartNumber(event: any) {
    const startNumber: number = event.target.value;
    const range: [number, number] = [startNumber, 0];
    setTempQuestion({ ...tempQuestion, range });
  }
  function changeRangeEndNumber(event: any) {
    const endNumber: number = event.target.value;
    const range: [number, number] = [
      typeof tempQuestion.range === "undefined" ? 0 : tempQuestion.range[0],
      endNumber,
    ];
    setTempQuestion({ ...tempQuestion, range });
  }
  function changePlaceholder(event: any) {
    const placeholder: string = event.target.value;
    setTempQuestion({ ...tempQuestion, placeholder });
  }
  function changeUnit(event: any) {
    const unit: number = event.target.value;
    setTempQuestion({ ...tempQuestion, unit });
  }
  function cleanTempQuestion() {
    setTempQuestion({ type: "radio", title: "" } as Question);
  }

  // there is a function and a hook, can be used to get the question from the parent component
  function getQuestion(): Question {
    return tempQuestion;
  }
  useImperativeHandle(ref, () => ({
    getQuestion,
    cleanTempQuestion,
  }));

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

      {/* Question No.3 */}
      {tempQuestion.type === "radio" ||
      tempQuestion.type === "checkbox" ||
      tempQuestion.type === "select" ? (
        /* Question No.3.1 Options */
        <QuestionOption
          type="number"
          onChange={changeTempQuestionOptions}
          tips={t("3. Number Of Options")}
          placeholder={"3"}
        ></QuestionOption>
      ) : tempQuestion.type === "slider" ? (
        /* Question No.3.2 StartNumber */
        <QuestionOption
          onChange={changeRangeStartNumber}
          type={"number"}
          tips={t("3. Start Number")}
          placeholder={"1"}
        ></QuestionOption>
      ) : (
        /* Question No.3.3 Placeholder */
        <QuestionOption
          onChange={changePlaceholder}
          type={"text"}
          tips={t("3. Tips")}
          placeholder="Enter your answer there"
        ></QuestionOption>
      )}

      {/* Question No.4 & Question No.5*/}
      {tempQuestion.type === "slider" && (
        <>
          {/* Question No.4 EndNumber */}
          <QuestionOption
            onChange={changeRangeEndNumber}
            tips={t("4. End Number")}
            type={"number"}
            placeholder="100"
          ></QuestionOption>
          {/* Question No 5 Unit */}
          <QuestionOption
            onChange={changeUnit}
            type={"number"}
            tips={t("5. Unit")}
            placeholder="5"
          ></QuestionOption>
        </>
      )}

      {/* </AnimatePresence> */}
    </Flex>
  );
});
// to fix the error: "Property 'displayName' is missing in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>' but required in type 'ForwardRefExoticComponent<ForwardRefRenderFunction<unknown, {}>>'."
CreateQuestion.displayName = "CreateQuestion";

export default CreateQuestion;
