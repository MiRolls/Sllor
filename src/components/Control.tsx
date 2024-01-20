import {Button, Flex, Text} from "@radix-ui/themes";
import {ControlData} from "../interfaces/control.d";
import React from "react";
import classNames from 'ClassNames'


const Control = ({ control }: { control: ControlData }) => {
    return control && (
        <Flex direction="column" className={control ? "p-3 gap-1 pt-2 flex fixed bg-accent w-1/5 h-full border-t-2 border-accent-800" : "hidden fixed"}>
            {control.map((item, index) => {
                return (
                    <Button key={item.toString() + index}
                        className={
                            classNames(
                                "p-10 !py-4 flex flex-nowrap !h-10 !justify-start",
                                { "!bg-accent-800": item.active }
                            )
                        } radius="full">
                        {React.cloneElement(item.icon, {
                            className: "h-6 w-6 ml-2"
                        })}
                        <Text>{item.name}</Text>
                    </Button>
                )
            })}
        </Flex >
    );
};

export default Control