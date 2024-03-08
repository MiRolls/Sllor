import { Box, Select, Text, TextFieldInput } from "@radix-ui/themes";
import { motion } from "framer-motion";
import React from "react";

interface QuestionOptionProps {
  onChange: any;
  type: "select" | "text" | "number";
  selectOptions?: any;
  tips: string;
  placeholder?: string;
  defaultValue?: string;
  animation?: boolean;
}

const QuestionOption = ({
  onChange,
  type,
  selectOptions,
  tips,
  placeholder,
  defaultValue,
  animation,
}: QuestionOptionProps) => {
  return (
    <motion.div
      className="flex origin-top items-center justify-between"
      initial={animation ? { opacity: 0.5, height: 0 } : {}}
      animate={animation ? { opacity: 1, height: "auto" } : {}}
      exit={animation ? { opacity: 0.5, height: 0 } : {}}
      // initial={{ opacity: 0.5, scale: 0.97 }}
      // animate={{ opacity: 1, scale: 1 }}
      // exit={{ opacity: 0.5, scale: 0.97 }}
    >
      <Text className="flex-1">{tips}</Text>
      {/* Select Question */}
      {type === "select" && (
        <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
          <Select.Trigger placeholder={placeholder} />
          <Select.Content>
            {/* Select options */}
            {Object.keys(selectOptions).map((key: any, index: number) => {
              const value = selectOptions[key];
              return (
                <Select.Item key={key + value + index + "wow"} value={key}>
                  {value}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Root>
      )}
      {type === "text" && (
        <Box className="flex-2">
          <TextFieldInput
            placeholder={placeholder}
            onChange={onChange}
          ></TextFieldInput>
        </Box>
      )}
      {type === "number" && (
        <Box className="flex-2">
          <TextFieldInput
            type="number"
            placeholder={placeholder}
            onChange={onChange}
            className="appearance-none"
          ></TextFieldInput>
        </Box>
      )}
    </motion.div>
  );
};
// QuestionOption.displayName = "QuestionOption";

export default QuestionOption;
