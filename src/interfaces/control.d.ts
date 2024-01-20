import { FC, ReactElement } from "react";


export type ControlData = {
    type: "choice" | "group";
    children?: { name: string; action: () => {}; icon: FC; active: boolean; }[];
    name: string;
    action?: () => any;
    icon: ReactElement<any, any>;
    active?: boolean;
}[];
