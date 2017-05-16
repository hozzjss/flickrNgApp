import { Tag } from "app/models/tags.model";

export interface PhotoInfo {
  "photo": {
    "id": string,
    "secret": string,
    "server": string,
    "farm":  number,
    "dateuploaded": string,
    "isfavorite":  number,
    "license": string,
    "safety_level": string,
    "rotation":  number,
    "originalsecret": string,
    "originalformat": string,
    "owner": {
      "nsid": string,
      "username": string,
      "realname": string,
      "location": "",
      "iconserver": string,
      "iconfarm":  number,
      "path_alias": null
    },
    "title": {
      "_content": string
    },
    "description": {
      "_content": string
    },
    "visibility": {
      "ispublic":  number,
      "isfriend":  number,
      "isfamily":  number
    },
    "dates": {
      "posted": string,
      "taken": string,
      "takengranularity":  number,
      "takenunknown": string,
      "lastupdate": string
    },
    "permissions": {
      "permcomment":  number,
      "permaddmeta":  number
    },
    "views": string,
    "editability": {
      "cancomment":  number,
      "canaddmeta":  number
    },
    "publiceditability": {
      "cancomment":  number,
      "canaddmeta":  number
    },
    "usage": {
      "candownload":  number,
      "canblog":  number,
      "canprint":  number,
      "canshare":  number
    },
    "comments": {
      "_content": string
    },
    "notes": {
      "note": any[]
    },
    "people": {
      "haspeople":  number
    },
    "tags": {
      "tag": Tag[]
    },
    "urls": {
      "url": [
        {
          "type": string,
          "_content": string
        }
      ]
    },
    "media": string
  },
  "stat": string
}