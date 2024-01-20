import {create} from "zustand";
import { Control, ControlData } from '../interfaces/control';

export interface ControlState {
    control: ControlData,
    changeControl: (value: ControlData) => void,
    active: (value: number) => void,
    clear: () => void
}

export const useControl = create((set): ControlState => ({
    control: [],
    changeControl: (value:ControlData) => set(() => {
        return {
            control: value
        }
    }),
    active: (value: number) => set((state: ControlState) => {
        // clone state
        const cloneState = state;

        // change the other ones' active to false
        cloneState.control.forEach((element: Control) => {
            element.active = false
        });

        // change the main one's active to true
        cloneState.control[value].active = true
        
        // return the value
        return {    
            control: cloneState
        }
    }),
    clear() {
        set(()=> ({}))
    }
}))

