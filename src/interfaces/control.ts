import {FC} from "react";

export type ControlData = {
    type: "choice" | "group",
    children?: [ { name: string, action: ()=>{}, icon: FC } ],
    name: string,
    action?: () => {},
    icon: FC
}[]