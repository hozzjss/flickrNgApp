export interface Galleries {
    "galleries": {
        "total": string,
        "page": number,
        "pages": number,
        "per_page": number,
        "user_id": string,
        "gallery": Gallery[]
    },
    "stat": string
}

export interface Gallery {
    "id": string,
    "url": string,
    "owner": string,
    "username": string,
    "iconserver": string,
    "iconfarm": number,
    "date_create": string,
    "date_update": string,
    "count_photos": string,
    "count_videos": string,
    "count_views": string,
    "count_comments": string,
    "title": {
        "_content": string
    },
    "description": {
        "_content": string
    },
    "primary_photo_id": string,
    "primary_photo_server": string,
    "primary_photo_farm": number,
    "primary_photo_secret": string,
}



export interface ParsedGallery {
    id: string,
    title: string,
    photo: string,
    photoCount: string,
    description: string,
    dateCreated: string
}