import { FC, ReactElement } from "react";

export type ControlData = Control[];

export interface Control {
	type: "choice" | "group";
	children?: { name: string; action: () => {}; icon: FC; active: boolean }[];
	name: string;
	action?: () => any;
	icon: ReactElement<any, any>;
	active?: boolean;
}
