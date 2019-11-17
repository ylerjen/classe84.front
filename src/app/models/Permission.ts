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
