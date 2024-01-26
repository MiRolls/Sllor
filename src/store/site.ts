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
		changeSite: (value: Site) =>
			set(() => ({
				site: value,
			})),
	})
);
