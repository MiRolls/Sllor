import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import enUs from "./en-us.json";
import zhCn from "./zh-cn.json";

const resources = {
    enUs: { translation: enUs },
    zhCn: { translation: zhCn },
};

function createI18n(lang: "zhCn"|"enUs"){
    return i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng: lang,
            fallbackLng: "enUs",
            interpolation: {
                escapeValue: false
            },
        });
}


export default createI18n;