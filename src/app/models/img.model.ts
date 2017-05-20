import { Tag } from "app/models/tags.model";
import {fComment} from "app/models/comments.model"

export interface ImgItem {
    link?: {
        "small": string,
        "thumb": string
        "medium": string,
        "large": string
    },
    title?: string,
    comments?: fComment[],
    tags?: Tag[],
    id?: string,
    description?: string 
}
