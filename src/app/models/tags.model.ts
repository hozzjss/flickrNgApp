export interface Tags {
  'photo': {
    'id': string,
    'tags': {
      'tag': Tag[]
    }
  },
  'stat': string
}

export interface Tag {
  'id': string,
  'author': string,
  'authorname': string,
  'raw': string,
  '_content': string,
  'machine_tag': boolean
}