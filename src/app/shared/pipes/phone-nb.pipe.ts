import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNb'
})
export class PhoneNbPipe implements PipeTransform {

    transform(phoneNb: string, args?: any): any {
        if (!phoneNb) {
            return '';
        }
        phoneNb = phoneNb.trim().replace(' ', '');
        let nbArr;
        switch (phoneNb.length) {
            // 079-123-457     => 9
            case 9:
                nbArr = [
                    phoneNb.substr(0, 3),
                    phoneNb.substr(3, 3),
                    phoneNb.substr(6, 3)
                ];
                phoneNb = nbArr.join('-');
                break;
                // 079 123 45 67     => 10
                case 10:
                    nbArr = [
                        phoneNb.substr(0, 3),
                        phoneNb.substr(3, 3),
                        phoneNb.substr(6, 2),
                        phoneNb.substr(8, 2)
                    ];
                    phoneNb = nbArr.join(' ');
                    break;
            // +41 79 123 45 67  => 12
            case 12:
                nbArr = [
                    phoneNb.substr(0, 3),
                    phoneNb.substr(3, 2),
                    phoneNb.substr(5, 3),
                    phoneNb.substr(8, 2),
                    phoneNb.substr(10, 2)
                ];
                phoneNb = nbArr.join(' ');
                break;
            // 0041 79 123 45 67 => 13
            case 13:
                nbArr = [
                    phoneNb.substr(0, 4),
                    phoneNb.substr(4, 2),
                    phoneNb.substr(6, 3),
                    phoneNb.substr(9, 2),
                    phoneNb.substr(11, 2)
                ];
                phoneNb = nbArr.join(' ');
                break;
        }
        return phoneNb;
    }

}
