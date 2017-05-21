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
  'machine_tag': number
}

export interface newTag {
  "id": string,
  "author": string,
  "authorname": string,
  "raw": string,
  "machine_tag": number,
  "_content": string,
  "full_tag_id": string,
}