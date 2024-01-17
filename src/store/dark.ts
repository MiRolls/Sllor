import {create} from "zustand";

export interface DarkState {
    dark: "dark" | "light",
    changeDark: (dark?: "dark" | "light") => void,
    onDarkChange: () => "dark" | "light"
}

export const useDark = create((set, get): DarkState => ({
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
    }),
    onDarkChange() {
        document.documentElement.className = "dark-theme"
        document.documentElement.style.colorScheme = "dark";
        return (get() as DarkState).dark
    }
}))

