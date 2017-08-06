import { PhoneNbPipe } from './phone-nb.pipe';

describe('PhoneNbPipe', () => {
    it('create an instance', () => {
        const pipe = new PhoneNbPipe();
        expect(pipe).toBeTruthy();
    });
    describe('should transform', () => {

        it('a 9 length value to xxx-xxx-xxx', () => {
            const phoneNb = '123456789';
            const expected = '123-456-789';
            const pipe = new PhoneNbPipe();
            const result = pipe.transform(phoneNb);
            expect(result).toEqual(expected);
        });

        it('a 10 length value to "xxx xxx xx xx"', () => {
            const phoneNb = '0791234567';
            const expected = '079 123 45 67';
            const pipe = new PhoneNbPipe();
            const result = pipe.transform(phoneNb);
            expect(result).toEqual(expected);
        });

        it('a 12 length value to "+xx xx xxx xx xx"', () => {
            const phoneNb = '+41791234567';
            const expected = '+41 79 123 45 67';
            const pipe = new PhoneNbPipe();
            const result = pipe.transform(phoneNb);
            expect(result).toEqual(expected);
        });

        it('a 13 length value to "xxxx xx xxx xx xx"', () => {
            const phoneNb = '0041791234567';
            const expected = '0041 79 123 45 67';
            const pipe = new PhoneNbPipe();
            const result = pipe.transform(phoneNb);
            expect(result).toEqual(expected);
        });
    });
});
