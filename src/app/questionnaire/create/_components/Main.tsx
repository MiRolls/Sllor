"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdErrorOutline, MdKeyboardArrowDown } from "react-icons/md";
import { AutoTextArea } from "react-textarea-auto-witdth-height";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { t } from "i18next";

import {
  Box,
  Button,
  Callout,
  Checkbox,
  Dialog,
  Flex,
  RadioGroup,
  Slider,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

import {
  InputAndTextarea,
  Question,
  Questionnaire,
  RadioCheckboxAndSelect,
} from "../../../../interfaces/questionnaire";
import CreateQuestion from "./CreateQuestion";

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
    if (question.type === "checkbox" || question.type === "radio" || question.type === "select") {
      if (typeof question.options === "undefined" || (question.options as string[]).length < 1) {
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
      (tempQuestionnaire.questions[questionNumber] as RadioCheckboxAndSelect).options.push("");
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
      return;
    }
    return true;
  }

  useEffect(() => {
    // console.log(questionnaire);
  }, [questionnaire]);

  useEffect(() => {
    setIsShowError(false);
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
          <Box className="min-h-2 w-11/12 py-2 sm:min-h-10 sm:w-4/5 sm:py-10">
            {questionnaire.questions.map((question, index) => {
              return (
                /**
                 *
                 *
                 * The title of the question
                 * The number of the question + . + the title of the question
                 *
                 *
                 */
                <Box key={index + "questionKey"} className="mt-3">
                  <Flex>
                    <Text className="select-none">{index + 1}.</Text>
                    <AutoTextArea
                      className="relative w-11/12 overflow-hidden !border-none bg-transparent !outline-none [resize:none]"
                      value={question.title}
                      onChange={changeQuestionTitle(index)}
                      onKeyDown={(event: any) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                    ></AutoTextArea>
                  </Flex>

                  {/**
                   *
                   *
                   * The options of the question
                   * If the type of the question is radio, render this part
                   *
                   *
                   */}
                  {question.type === "radio" && (
                    <>
                      <RadioGroup.Root>
                        <Flex gap="1" className="mt-1" direction="column">
                          {question.options.map((option, optionIndex) => {
                            return (
                              <Text as="label" size="2" key={optionIndex + "optionKey"}>
                                <Flex gap="2" align={"center"}>
                                  <RadioGroup.Item value="any" disabled />
                                  {/* RadioGroup's value is help react to get the group's value, but we don't need to get it, so we can write any in it */}
                                  <AutoTextArea
                                    className="w-11/12 !border-none !bg-transparent text-base !outline-none [resize:none]"
                                    placeholder={t("Option") + " " + (optionIndex + 1)}
                                    onKeyDown={(event: any) => {
                                      if (event.key === "Enter") {
                                        event.preventDefault();
                                      }
                                    }}
                                    value={option}
                                    onChange={getChangeOption(index, optionIndex)}
                                  ></AutoTextArea>
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

                  {/**
                   *
                   *
                   * If the type of the question is checkbox, render this part
                   *
                   *
                   */}
                  {question.type === "checkbox" && (
                    <>
                      <Flex gap="1" className="mt-1" direction="column">
                        {question.options.map((option, optionIndex) => {
                          return (
                            <Text as="label" size="2" key={optionIndex + "optionKey"}>
                              <Flex gap="2" align={"center"}>
                                <Checkbox disabled />
                                <AutoTextArea
                                  className="w-11/12 !border-none !bg-transparent text-base !outline-none [resize:none]"
                                  placeholder={t("Option") + " " + (optionIndex + 1)}
                                  value={option}
                                  onChange={getChangeOption(index, optionIndex)}
                                ></AutoTextArea>
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

                  {/**
                   *
                   *
                   * If the type of the question is select, render this part
                   *
                   *
                   */}
                  {question.type === "select" && (
                    <Box>
                      <Button
                        variant="soft"
                        onClick={showSelectContent(index)}
                        className="relative max-w-full overflow-clip"
                      >
                        {question.options[0] === "" ? t("Option") + " 1" : question.options[0]}
                        <MdKeyboardArrowDown />
                      </Button>
                      {/* act as select.content */}
                      <AnimatePresence>
                        {showSelectContentNumber === index && (
                          <>
                            <Box
                              className="absolute left-0 top-0  z-10 h-screen w-full bg-transparent"
                              onClick={showSelectContent(-1)}
                            ></Box>
                            <motion.div
                              className="absolute z-20 ml-1 mt-[-30px] origin-top-left rounded-sm bg-background p-2 shadow-xl"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.075 }}
                            >
                              {question.options.map((option, optionIndex) => {
                                return (
                                  <Box key={optionIndex + "optionKey"} className="pl-2">
                                    {/* {option} */}
                                    <AutoTextArea
                                      className={`w-24 border-none !bg-transparent !text-[14px] outline-none [resize:none]`}
                                      placeholder={t("Option") + " " + (optionIndex + 1)}
                                      value={option}
                                      onChange={getChangeOption(index, optionIndex)}
                                    ></AutoTextArea>
                                  </Box>
                                );
                              })}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </Box>
                  )}
                  {/**
                   *
                   *
                   * If the type of the question is input, render this part
                   *
                   *
                   */}
                  {question.type === `input` && (
                    <Box className="mt-1">
                      <input
                        className="w-full !border-b-[1px] border-b-black text-slate-600 outline-none focus:border-b-accent-600"
                        value={question.placeholder}
                        onChange={(event: any) => changeInputPlaceholder(index, event.target.value)}
                      ></input>
                    </Box>
                  )}
                  {/**
                   *
                   *
                   *
                   * If the type of the question is textarea, render this part
                   *
                   *
                   */}
                  {question.type === `textarea` && (
                    <Box className="mt-1">
                      <TextArea
                        // className="w-full text-slate-600 border-[1px] border-black focus:border-accent-600"
                        className="w-full text-slate-600-textarea"
                        value={question.placeholder}
                        onChange={(event: any) => changeInputPlaceholder(index, event.target.value)}
                      ></TextArea>
                    </Box>
                  )}
                  {/**
                   *
                   *
                   * If the type of the question is date, render this part
                   *
                   *
                   */}
                  {question.type === "slider" && (
                    <Box>
                      {/* Slider Control */}
                      <Slider className="w-full mt-3 mb-3" disabled></Slider>
                      {/* Slider Content */}
                      <Flex justify={"between"} gap="3">
                        <input
                          type="text"
                          className="border-none outline-none text-left flex-1"
                          placeholder={t("Start Number")}
                          value={question.range[0]}
                          onChange={(event: any) => {
                            changeSlider(index, "startNumber", event.target.value)
                              ? event.preventDefault()
                              : null;
                          }}
                        />

                        <input
                          type="text"
                          className="border-none outline-none text-center flex-1"
                          placeholder={t("Unit")}
                          value={question.unit}
                          onChange={(event: any) => {
                            changeSlider(index, "unit", event.target.value)
                              ? event.preventDefault()
                              : null;
                          }}
                        />

                        <input
                          type="text"
                          className="border-none outline-none text-right flex-1"
                          placeholder={t("End Number")}
                          value={question.range[1]}
                          onChange={(event: any) => {
                            changeSlider(index, "endNumber", event.target.value)
                              ? event.preventDefault()
                              : null;
                          }}
                        />
                      </Flex>
                      <Flex justify={"between"} className="text-slate-600">
                        <Text className="flex-1 text-left">{t("Start Number")}</Text>
                        <Text className="flex-1 text-center">{t("Unit")}</Text>
                        <Text className="flex-1 text-right">{t("End Number")}</Text>
                      </Flex>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

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
