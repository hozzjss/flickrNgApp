export interface Photos {
    'photos': {
        'page': number,
        'pages': number,
        'perpage': number,
        'total': string,
        'photo': Photo[]
    },
    'stat': string
}

export interface Photo {
    'id': string,
    'owner'?: string,
    'secret': string,
    'server': string,
    'farm': number,
    'title'?: string,
    'ispublic'?: number,
    'isfriend'?: number,
    'isfamily'?: number
}