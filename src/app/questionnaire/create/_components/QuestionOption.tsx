import { Select, Text, TextFieldInput } from "@radix-ui/themes";
import React from "react";

interface QuestionOptionProps {
    onChange: any;
    type: "select" | "text" | "number";
    selectOptions?: any;
    tips: string;
    placeholder?: string;
    defaultValue?: string;
}

const QuestionOption = ({
    onChange,
    type,
    selectOptions,
    tips,
    placeholder,
    defaultValue,
}: QuestionOptionProps) => {
    return (
        <div
            className="flex items-center justify-between origin-top"
            // initial={{ opacity: 0.5, scale: 0.97 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0.5, scale: 0.97 }}
        >
            <Text>{tips}</Text>
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
                <TextFieldInput placeholder={placeholder} onChange={onChange}></TextFieldInput>
            )}
            {type === "number" && (
                <TextFieldInput
                    type="number"
                    placeholder={placeholder}
                    onChange={onChange}
                    className="appearance-none"
                ></TextFieldInput>
            )}
        </div>
    );
};
// QuestionOption.displayName = "QuestionOption";

export default QuestionOption;
