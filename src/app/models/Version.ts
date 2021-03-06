export class Version {
    public major: number;
    public minor: number;
    public patch: number;
    public rev: string;
    public suffix: string;

    static fromObj(version: { major, minor, patch }): Version {
        const v = new Version();
        v.major = version.major;
        v.minor = version.minor;
        v.patch = version.patch;
        return v;
    }

    constructor(fullVer: string = '') {
        const defaultVersionSegment = 0;
        // split a possible alpha/beta suffix
        const splitSuffix = fullVer.split('-');
        if (splitSuffix.length > 1) {
            this.suffix = splitSuffix[1];
        }
        // split the version
        const verSplit = splitSuffix[0].split('.');
        this.major = verSplit.length > 0 ? +verSplit[0] : defaultVersionSegment;
        this.minor = verSplit.length > 1 ? +verSplit[1] : defaultVersionSegment;
        this.patch = verSplit.length > 2 ? +verSplit[2] : defaultVersionSegment;
        this.rev = verSplit.length > 3 ? verSplit[3] : '';
    }

    public get full(): string {
        let version = `${this.major.toString()}.${this.minor.toString()}.${this.patch.toString()}`;
        if (this.rev) {
            version += `.${this.rev}`;
        }
        if (this.suffix) {
            version += `-${this.suffix}`;
        }
        return version;
    }
}
