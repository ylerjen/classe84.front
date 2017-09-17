import { User } from './User';

export class SessionUser extends User {

    public loginTime;

    constructor(user: User) {
        super(user);

        this.loginTime = new Date();
    }
}
