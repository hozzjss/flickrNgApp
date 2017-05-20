export interface fComments {
  'comments': {
    'photo_id': string,
    'comment': fComment[]
  },
  'stat': string
}

export interface fComment {
  'id': string,
  'author': string,
  'author_is_deleted'?: number,
  'authorname': string,
  'iconserver': string,
  'iconfarm': number,
  'datecreate': string,
  'permalink': string,
  'path_alias': object,
  'realname': string,
  '_content': string
}

// this is the received response from adding a new comment
export interface fNewCommentResponse {
  "comment": {
    "id": string,
    "author": string,
    "authorname": string,
    "datecreate": string,
    "permalink": string,
    "path_alias": object,
    "realname": string,
    "_content": string,
    "iconurls": {
      "retina": string,
      "large": string,
      "medium": string,
      "small": string,
      "default": string
    }
  },
  "stat": "ok"
}