import { Questionnaire } from "@/interfaces/questionnaire";
import { Flex, RadioGroup, Button, Checkbox, TextArea, Box, Text, Slider } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { t } from "i18next";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AutoTextArea } from "react-textarea-auto-witdth-height";

interface QuestionEditorProps {
  questionnaire: Questionnaire;
  changeQuestionTitle: (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  getChangeOption: (
    questionIndex: number,
    optionIndex: number
  ) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addOption: (index: number) => (event?: any) => void;
  changeSlider: (
    questionNumber: number,
    type: "unit" | "startNumber" | "endNumber",
    value: number
  ) => boolean;
  changeInputPlaceholder: (index: number, value: string) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  questionnaire,
  changeQuestionTitle,
  getChangeOption,
  addOption,
  changeInputPlaceholder,
  changeSlider,
}) => {
  const [showSelectContentNumber, setShowSelectContentNumber] = useState(-1);

  function showSelectContent(questionNumber: number) {
    return (event: any) => {
      setShowSelectContentNumber(questionNumber);
    };
  }

  return (
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
          <Box key={index + "questionKey"} className="mt-4">
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
                    onClick={addOption(index) as any}
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
                <Button variant="soft" size={"1"} className="!mt-2" onClick={addOption(index)}>
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
                  <Box className="flex-1">
                    <input
                      type="text"
                      className="border-none outline-none text-left w-full"
                      // className="border-none outline-none text-left"
                      placeholder={t("Start Number")}
                      value={question.range[0]}
                      onChange={(event: any) => {
                        changeSlider(index, "startNumber", event.target.value)
                          ? event.preventDefault()
                          : null;
                      }}
                    />
                  </Box>
                  <Box className="flex-1">
                    <input
                      type="text"
                      className="border-none outline-none text-center w-full"
                      // className="border-none outline-none text-center"
                      placeholder={t("Unit")}
                      value={question.unit}
                      onChange={(event: any) => {
                        changeSlider(index, "unit", event.target.value)
                          ? event.preventDefault()
                          : null;
                      }}
                    />
                  </Box>
                  <Box className="flex-1">
                    <input
                      type="text"
                      className="border-none outline-none text-right w-full"
                      // className="border-none outline-none text-right"
                      placeholder={t("End Number")}
                      value={question.range[1]}
                      onChange={(event: any) => {
                        changeSlider(index, "endNumber", event.target.value)
                          ? event.preventDefault()
                          : null;
                      }}
                    />
                  </Box>
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
  );
};

export default QuestionEditor;
