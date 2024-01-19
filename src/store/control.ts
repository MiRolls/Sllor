import {create} from "zustand";
import {ControlData} from "../interfaces/control.ts";

export interface ControlState {
    control: ControlData,
    changeControl: (value: ControlData) => void,
}

export const useControl = create((set): ControlState => ({
    control: [],
    changeControl: (value) => set(() => {
        return {
            control: value
        }
    })
}))

