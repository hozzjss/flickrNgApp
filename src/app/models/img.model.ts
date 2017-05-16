import { Tag } from "app/models/tags.model";
import {Comment} from "app/models/comments.model"

export interface ImgItem {
    link?: {
        "small": string,
        "thumb": string
        "medium": string,
        "large": string
    },
    title?: string,
    comments?: Comment[],
    tags?: Tag[],
    id?: string,
    description?: string 
}
