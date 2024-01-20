import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import classNames from "ClassNames";
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
					className="h-screen w-fix lg:w-1/5 md:w-4/12 w-4/5"
					transition={{
						damping: 10,
						stiffness: 100,
						duration: 0.2,
					}}
				>
					<Flex
						direction="column"
						className="p-3 gap-1 pt-2 flex fixed bg-accent w-full h-full border-t-2 border-accent-800"
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
