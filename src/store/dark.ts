import {create} from "zustand";

export interface DarkState {
    dark: "dark" | "light",
    changeDark: (dark?: "dark" | "light") => void,
}

export const useDark = create((set): DarkState => ({
    dark: "light",
    changeDark: (dark?) => set((state: any) => {
        let darkMode
        if(typeof dark === "string") {
            return {dark}
        }

        if (state.dark === "dark") {
            darkMode = "light"
        } else {
            darkMode = "dark"
        }

        return {
            dark: darkMode
        }
    })
}))

