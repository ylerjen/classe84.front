export enum ENotificationType {
    INFO = 'info',
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error',
};

export const DEFAULT_NOTIF_DURATION = 15000;

export class Notification {
    id: number;
    msg: string;
    createdAt: Date;
    type: ENotificationType;
    isSelfDestructible: boolean;

    constructor(msg: string, type: ENotificationType = ENotificationType.ERROR, isSelfDestructible = true) {
        const now = new Date();
        this.id = +now;
        this.msg = msg;
        this.type = type;
        this.createdAt = now;
        this.isSelfDestructible = isSelfDestructible;
    }
}
