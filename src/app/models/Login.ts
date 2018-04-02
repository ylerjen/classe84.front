/**
 * A login object which contains the login detail
 */
export class Login {

    constructor(
        public email: string,
        public password: string,
        public remember: boolean = false
    ) {}

    clean() {
        this.email = '';
        this.password = '';
    }
}

export class LoginFactory {
    static fromObject(obj: { [key: string]: any }): Login {
        return new Login(obj.email, obj.password, obj.remember);
    }

    static fromParam(email: string, password: string, remember: boolean): Login {
        return new Login(email, password, remember);
    }
}
