export interface Comments {
  'comments': {
    'photo_id': string,
    'comment': Comment[]
  },
  'stat': string
}

export interface Comment {
    'id': string,
    'author': string,
    'author_is_deleted': number,
    'authorname': string,
    'iconserver': string,
    'iconfarm': number,
    'datecreate': string,
    'permalink': string,
    'path_alias': null,
    'realname': string,
    '_content': string
}