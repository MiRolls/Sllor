import { Site } from "../interfaces/site";

function changeSiteDOM(data: Site) {
    // Set lang
    document.documentElement.lang = data.lang;

    // Get element
    const iconElement: HTMLLinkElement = document.getElementById("icon") as HTMLLinkElement;
    const titleElement: HTMLTitleElement = document.getElementById("title") as HTMLTitleElement;

    // Change element
    iconElement.href = data.logo;
    titleElement.innerHTML = data.name;
}

export default changeSiteDOM;
