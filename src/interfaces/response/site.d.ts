import {Site} from "../site";
import {Response} from "./response"

export interface SiteGet extends Response{
    data: Site
}