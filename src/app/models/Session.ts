import { User } from './User';

/**
 * A session object used when a user has logged in
 */
export class Session {
    public loginTime: Date;
    public token: string;
    public tokenType: string;
    public expiresIn: number;
    public user: User;

    constructor(opts: { [key: string]:  any }) {
        this.loginTime = opts.loginTime || new Date();
        this.token = opts.token;
        this.tokenType = opts.tokenType
        this.expiresIn = opts.expiresIn;
        this.user = opts.user ? new User(opts.user) : null;
    }
}
