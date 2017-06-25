export enum EGender {
    Male,
    Female
}

export class User {
    public id: number;
    public last_name: string;
    public maiden_name: string;
    public first_name: string;
    public gender: EGender;
    public birthdate: Date;
    public is_active: boolean;
    public email: string;
    public phone: string;
    public mobile: string;
    public fb_user_id: string;
    public fb_profile_name: string;
    public website: string;

    get fullName() {
        let name = this.last_name;
        if (this.maiden_name) {
            name += ` (${this.maiden_name})`;
        }
        name += ` ${this.last_name}`;
        return name;
    }
}
