export enum EGender {
    Male,
    Female
}

/**
 * A user object that describe a member person
 */
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

    get fullname(): string {
        let name = '';
        if (this.last_name) {
            name += this.last_name;
        }
        if (this.maiden_name) {
            name += ` (${this.maiden_name})`;
        }
        if (this.first_name) {
            name += ` ${this.first_name}`;
        }
        return name;
    }

    constructor(props: { [key: string]: any } = {}) {
        this.id = props.id;
        this.last_name = props.last_name;
        this.maiden_name = props.maiden_name;
        this.first_name = props.first_name;
        this.gender = props.gender;
        this.birthdate = props.birthdate;
        this.is_active = props.is_active;
        this.email = props.email;
        this.phone = props.phone;
        this.mobile = props.mobile;
        this.fb_user_id = props.fb_user_id;
        this.fb_profile_name = props.fb_profile_name;
        this.website = props.website;
    }

    /**
     * Calculate the age of the person at a given date
     * @param [refDate=now()] is the date used to calculate the age. If none is passed, current date is used.
     * @returns {number} the calculated age
     */
    getAge(refDate: Date): number {
        if (typeof refDate === 'undefined') {
            refDate = new Date();
        }
        let age = refDate.getFullYear() - this.birthdate.getFullYear();
        const m = refDate.getMonth() - this.birthdate.getMonth();
        if (m < 0 || (m === 0 && refDate.getDate() < this.birthdate.getDate())) {
            age--;
        }
        return age;
    }
}
