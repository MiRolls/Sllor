import { create } from "zustand";
import { Site } from "../interfaces/site";

export interface SiteState {
    site: Site;
    changeSite: (value: Site) => void;
}

export const useSite = create(
    (set): SiteState => ({
        site: {
            name: "",
            "site-url": "",
            "main-color": "",
            lang: "enUs",
            logo: "",
            introduce: "",
            about: "",
            footer: "",
            "short-introduce": "",
        },
        changeSite: (value: Site) => {
            // Change DOM
            // const title = document.getElementById("title") as HTMLTitleElement;
            // const icon = document.getElementById("icon") as HTMLLinkElement;
            // const description = document.querySelector(
            // 'meta[name="description"]'
            // ) as HTMLMetaElement;

            // title.innerText = value.name;
            // icon.href = value.logo;
            // description.content = value["short-introduce"];

            set(() => ({
                site: value,
            }));
        },
    })
);
