import { User } from './User';

/**
 * A session object used when a user has logged in
 */
export class Session {

    public loginTime: Date;
    public token: string;
    public user: User;

    constructor(opts: { [key: string]:  any }) {
        this.loginTime = opts.loginTime || new Date();
        this.token = opts.token;
        this.user = opts.user;
    }
}
