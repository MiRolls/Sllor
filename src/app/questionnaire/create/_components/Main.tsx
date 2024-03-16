"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { AutoTextArea } from "react-textarea-auto-witdth-height";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { t } from "i18next";

import { Box, Button, Callout, Dialog, Flex, Text } from "@radix-ui/themes";

import {
  InputAndTextarea,
  Question,
  Questionnaire,
  RadioCheckboxAndSelect,
} from "../../../../interfaces/questionnaire";
import CreateQuestion from "./CreateQuestion";
import QuestionEditor from "./QuestionEditor";
import ErrorBox from "./ErrorBox";

export default function Main() {
  // global page questionnaire
  const [questionnaire, setQuestionnaire] = useState({
    title: "",
    questions: [],
  } as Questionnaire);
  const DialogComponent = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShowLeaveBlankError, setIsShowLeaveBlankError] = useState(false);
  const [isShowNumberSizeError, setIsShowNumberSizeError] = useState(false);

  // add a question to the questionnaire
  function addQuestion() {
    // first, check
    const question: Question = (DialogComponent.current as any).getQuestion();
    if (question.type === "checkbox" || question.type === "radio" || question.type === "select") {
      if (typeof question.options === "undefined" || (question.options as string[]).length < 1) {
        // user leaves blank at options question
        console.log(question);
        setIsShowLeaveBlankError(true);
        (DialogComponent.current as any).cleanTempQuestion();
        return;
      }
    } else if (question.type === "slider") {
      if ((question as any).range[0] >= (question as any).range[1]) {
        setIsShowNumberSizeError(true);
        (DialogComponent.current as any).cleanTempQuestion();
        return;
        // else if the range is undefined or the unit is undefined
      } else if (
        typeof (question as any).range === "undefined" ||
        typeof (question as any).unit === "undefined"
      ) {
        setIsShowLeaveBlankError(true);
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
    return (event?: any) => {
      const tempQuestionnaire = { ...questionnaire };
      (tempQuestionnaire.questions[questionNumber] as RadioCheckboxAndSelect).options.push("");
      setQuestionnaire(tempQuestionnaire);
    };
  }
  function changeQuestionTitle(questionNumber: number) {
    return (event: any) => {
      const tempQuestionnaire = { ...questionnaire };
      tempQuestionnaire.questions[questionNumber].title = event.target.value;
      setQuestionnaire(tempQuestionnaire);
    };
  }
  function changeInputPlaceholder(questionNumber: number, placeholder: string) {
    const tempQuestionnaire = { ...questionnaire };
    (tempQuestionnaire.questions[questionNumber] as InputAndTextarea).placeholder = placeholder;
    setQuestionnaire(tempQuestionnaire);
  }
  function changeSlider(
    questionNumber: number,
    type: "startNumber" | "endNumber" | "unit",
    value: number
  ) {
    function canBeConvertedToNumber(str: any): boolean {
      let num = Number(str);
      return !isNaN(num);
    }

    if (!canBeConvertedToNumber(value)) {
      return false;
    }

    if (type === "startNumber") {
      const tempQuestionnaire = { ...questionnaire };
      (tempQuestionnaire.questions[questionNumber] as any).range[0] = value;
      setQuestionnaire(tempQuestionnaire);
    } else if (type === "endNumber") {
      const tempQuestionnaire = { ...questionnaire };
      (tempQuestionnaire.questions[questionNumber] as any).range[1] = value;
      setQuestionnaire(tempQuestionnaire);
    } else if (type === "unit") {
      const tempQuestionnaire = { ...questionnaire };
      (tempQuestionnaire.questions[questionNumber] as any).unit = value;
      setQuestionnaire(tempQuestionnaire);
    } else {
      console.error("Invalid type of change slider function");
    }
    return true;
  }

  useEffect(() => {
    // console.log(questionnaire);
  }, [questionnaire]);

  useEffect(() => {
    setIsShowLeaveBlankError(false);
  }, [isDialogOpen]);

  return (
    <Flex className="h-full w-full" direction={"column"} align={"center"}>
      <Box className="scroll-bar relative h-full w-full overflow-scroll">
        <Flex className="w-full p-6 sm:p-32" direction={"column"} align={"center"}>
          {/**
           *
           *
           * Title
           * Can change the height of the textarea by changing the padding of the parent element
           *
           *
           * */}
          <AutoTextArea
            placeholder={t("New Questionnaire")}
            className="text-center-textarea relative block w-full !overflow-hidden !border-none bg-transparent !text-3xl font-bold !outline-none [resize:none] sm:!text-4xl"
            onChange={(event: any) =>
              setQuestionnaire({ ...questionnaire, title: event.target.value })
            }
            onKeyDown={(event: any) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
          />

          {/**
           *
           *
           * Render Questions
           * The min-h-2.w-11/12...Box is the container of the questions
           *
           *
           * */}
          <QuestionEditor
            questionnaire={questionnaire}
            changeQuestionTitle={changeQuestionTitle}
            getChangeOption={getChangeOption}
            addOption={addOption}
            changeInputPlaceholder={changeInputPlaceholder}
            changeSlider={changeSlider}
          ></QuestionEditor>

          {/**
           * Dialog
           * The Dialog to add the question
           *  */}
          <Box className="mt-5 block">
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Dialog.Trigger>
                {/* Button to open dialog */}
                <Button size={"3"} radius="full" className="!bg-accent-700 !text-white">
                  <Flex gap="1" align={"center"}>
                    <IoMdAdd size={25} className=" mr-0 text-white" />
                    <Text>{t("Add Question")}</Text>
                  </Flex>
                </Button>
              </Dialog.Trigger>
              <LayoutGroup>
                <Dialog.Content>
                  <Dialog.Title>{t("Add Question")}</Dialog.Title>
                  <CreateQuestion onInput={() => setIsDialogOpen(false)} ref={DialogComponent} />
                  {/* If user leaves blank */}
                  <ErrorBox
                    isShowLeaveBlankError={isShowLeaveBlankError}
                    isShowNumberSizeError={isShowNumberSizeError}
                    // isShowNumberSizeError={true}
                  ></ErrorBox>
                  <Flex className="mt-2 !justify-end gap-1">
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
      </Box>
    </Flex>
  );
}
