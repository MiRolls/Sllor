import { Callout } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { t } from "i18next";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

export interface ErrorBoxProps {
  isShowLeaveBlankError: boolean;
  isShowNumberSizeError: boolean;
}

export default function ErrorBox({ isShowLeaveBlankError, isShowNumberSizeError }: ErrorBoxProps) {
  return (
    <>
      <AnimatePresence>
        {isShowLeaveBlankError && (
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
      <AnimatePresence>
        {isShowNumberSizeError && (
          <motion.div
            layout
            initial={{ opacity: 0.7, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Callout.Root color="red" size="1" className="mt-2">
              <Callout.Icon>
                <MdErrorOutline size={"17"} />
              </Callout.Icon>
              <Callout.Text>
                {t("The end number cannot be smaller than the start number")}
              </Callout.Text>
            </Callout.Root>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
