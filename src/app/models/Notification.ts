export enum ENotificationType {
    INFO,
    WARNING,
    SUCCESS,
    ERROR,
};

export class Notification {
    id: number;
    msg: string;
    createdAt: Date;
    type: ENotificationType;

    constructor(msg: string, type: ENotificationType) {
        const now = new Date();
        this.id = +now;
        this.msg = msg;
        this.type = type;
        this.createdAt = now;
    }
}
