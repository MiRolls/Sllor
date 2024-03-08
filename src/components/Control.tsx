import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import classNames from "@/utils/classNames";
import { AnimatePresence, motion } from "framer-motion";
import { ControlState, useControl } from "../store/control";

const Control = () => {
  const control = useControl((state) => (state as ControlState).control);
  const show = useControl((state) => (state as ControlState).show);
  return (
    <AnimatePresence mode="wait">
      {control.length > 0 && show && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="w-fix fixed h-full w-4/5 md:w-4/12 lg:w-1/5"
          transition={{
            damping: 10,
            stiffness: 100,
            duration: 0.2,
          }}
        >
          <Flex
            direction="column"
            className="flex h-full w-full gap-1 border-r-[1px] border-slate-100 bg-none p-3 pt-4"
          >
            {control.map((item, index) => {
              if (item.type === "choice") {
                return (
                  <Button
                    key={item.toString() + index + "ChoiceKey"}
                    className={classNames(
                      "flex !h-10 flex-nowrap !justify-start !bg-transparent p-10 !py-4 hover:!bg-slate-200",
                      { "!bg-accent-800": item.active },
                    )}
                    onClick={item.action}
                    radius="full"
                  >
                    {React.cloneElement(item.icon as ReactElement, {
                      className: "h-[1.35rem] w-[1.35rem] ml-2",
                    })}
                    <Text>{item.name}</Text>
                  </Button>
                );
              } else {
                // group
                return (
                  <>
                    <Text
                      className="pl-1 text-slate-600"
                      key={item.toString() + index + "GroupKey"}
                    >
                      {item.name}
                    </Text>
                    {item.children?.map((childrenItem, childrenIndex) => {
                      return (
                        <Button
                          key={childrenItem.toString() + index + "ChoiceKey"}
                          className={classNames(
                            "flex !h-10 flex-nowrap !justify-start !bg-transparent p-10 !py-4 hover:!bg-slate-200",
                            { "!bg-accent-800": childrenItem.active },
                          )}
                          onClick={childrenItem.action}
                          radius="full"
                        >
                          {React.cloneElement(childrenItem.icon as any, {
                            className: "h-[1.35rem] w-[1.35rem] ml-2",
                          })}
                          <Text>{childrenItem.name}</Text>
                        </Button>
                      );
                    })}
                  </>
                );
              }
            })}
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Control;
