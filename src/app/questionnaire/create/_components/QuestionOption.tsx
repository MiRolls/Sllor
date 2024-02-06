import { Flex, Select, Text } from "@radix-ui/themes";
import React from "react";

interface QuestionOptionProps {
    onChange: any;
    type: "select" | "text" | "number";
    selectOptions?: any;
    tips?: string;
}

export default function QuestionOption({
    onChange,
    type,
    selectOptions,
    tips,
}: QuestionOptionProps) {
    return (
        <Flex align="center" justify={"between"}>
            <Text>{tips}</Text>
            {type === "select" && (
                <Select.Root defaultValue="input" onValueChange={onChange}>
                    <Select.Trigger />
                    <Select.Content>
                        {/* Select options */}
                        {selectOptions?.key().map((key: any, index: number) => {
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
        </Flex>
    );
}
