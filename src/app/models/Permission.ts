export class Permission {
    id: number;
    name: string;
    createdAt: Date;

    constructor(opts: {[key: string]: any} = {}) {
        this.id = opts.id;
        this.name = opts.name;
        this.createdAt = opts.createdAt;
    }
}

export const CAN_MODIFY_USERS = 'users::modify';
