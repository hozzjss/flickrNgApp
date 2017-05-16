export interface Auth {
    auth: {
        perms: {
            _content: string
        },
        token: {
            _content: string
        },
        user: {
            fullname: string
            nsid: string
            username: string
        },
    }
    stat: string
}