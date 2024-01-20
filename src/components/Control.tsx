import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import classNames from "ClassNames";
import { AnimatePresence, motion } from "framer-motion";
import { ControlState, useControl } from "../store/control";

const Control = () => {
	const control = useControl((state) => (state as ControlState).control);
	return (
		<AnimatePresence mode="wait">
			{control.length > 0 && (
				<motion.div
					initial={{ marginLeft: "-25%" }}
					animate={{ marginLeft: 0 }}
					exit={{ marginLeft: "-25%" }}
				>
					<Flex
						direction="column"
						className="p-3 gap-1 pt-2 flex fixed bg-accent w-1/5 h-full border-t-2 border-accent-800"
					>
						{control.map((item, index) => {
							return (
								<Button
									key={item.toString() + index}
									className={classNames(
										"p-10 !py-4 flex flex-nowrap !h-10 !justify-start",
										{ "!bg-accent-800": item.active }
									)}
									onClick={item.action}
									radius="full"
								>
									{React.cloneElement(item.icon, {
										className: "h-6 w-6 ml-2",
									})}
									<Text>{item.name}</Text>
								</Button>
							);
						})}
					</Flex>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Control;
