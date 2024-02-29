import { SiteGet } from "@/interfaces/response/site";
import { Site } from "../interfaces/site";
import apiList from "./apiList";

export const SiteLoader = async (): Promise<[boolean, Site | any]> => {
    console.log("GET!");
    // tips User in console when SiteLoader be called
    let data: SiteGet;
    try {
        if (typeof window === "undefined") {
            // const localURL = `http://${headers().get("host")}`;
            const localURL = process.env.MIROLLS_URL;
            data = await (
                await fetch(localURL + apiList.getSite, { method: "POST", cache: "no-store" })
            ).json();
        } else {
            data = await (
                await fetch(apiList.getSite, { method: "POST", cache: "no-store" })
            ).json();
        }
    } catch (error) {
        return [false, (error as any).toString()];
    }
    // server impossible return ```code !== 200``` status

    return [true, data.data];
};

/**
 * Retrieves the site information, either from the window object in a browser environment or the globalThis object in a non-browser environment.
 *
 * @return {Promise<Site>} The site information retrieved from the appropriate object.
 */
async function getSite() {
    let site: [boolean, Site];
    if (typeof window !== "undefined") {
        if (!(window as any).site) {
            (window as any).site = SiteLoader();
        }
        /* } else {
            // if promise is loading, waiting for promise done and return the site
            await (window as any).site;
        } */
        site = (window as any).site;
    } else {
        if (typeof (globalThis as any).site === "undefined") {
            (globalThis as any).site = SiteLoader();
            // set loading the site time
            (globalThis as any).getSiteTime = Date.now();
            // if get site time more than 120s, get again the site
            if (Date.now() - (globalThis as any).getSiteTime > 120000) {
                (globalThis as any).site = SiteLoader();
            }
        }
        // } else {
        // if promise is loading, waiting for promise done and return the site
        // await (globalThis as any).site;
        // }
        site = await (globalThis as any).site;
    }
    return site;
}

export default getSite;
