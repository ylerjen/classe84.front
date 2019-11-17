import { User } from './User';
import { Permission } from './Permission';

/**
 * A session object used when a user has logged in
 */
export class Session {
    public loginTime: Date;
    public token: string;
    public tokenType: string;
    public expiresIn: number;
    public user: User;
    public roles: Array<string>;
    public permissions: Array<Permission>;

    constructor(opts: { [key: string]:  any }) {
        this.loginTime = opts.loginTime || new Date();
        this.token = opts.token;
        this.tokenType = opts.tokenType;
        this.expiresIn = opts.expiresIn;
        this.user = opts.user ? new User(opts.user) : null;
        this.roles = opts.roles;
        this.permissions = opts.permissions;
    }

    isAdmin() {
        return Array.isArray(this.roles) && this.roles.includes('admin');
    }

    isComite() {
        return this.isAdmin() || (Array.isArray(this.roles) && this.roles.includes('comite'));
    }
}
