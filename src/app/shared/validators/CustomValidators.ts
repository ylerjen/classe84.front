import { FormGroup } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

export class CustomValidators {
    /**
     * Validate that all fields passed in the string array have the same value
     * @param fieldList - a list of fields name from the form group
     */
    static sameFieldsContentValidator(...fieldList: Array<string>): ValidatorFn {
        return (frmgroup: FormGroup): { [key: string]: any } => {
            if ( ! (Array.isArray(fieldList) && fieldList.length > 1)) {
                return null;
            }
            const refFieldName = fieldList[0];
            const refFieldVal = frmgroup.controls[refFieldName].value;
            let isValid = true;
            for (let idxField = 1, idxMax = fieldList.length; idxField < idxMax; idxField++) {
                const curFieldName = fieldList[idxField];
                const curFieldVal = frmgroup.controls[curFieldName].value;
                if (refFieldVal !== curFieldVal) {
                    isValid = false;
                    break;
                }
            }
            return (!isValid) ? { fieldContentMismatched: true } : null;
        };
    }

    static endDateIsGreaterOrEqualThanStartDateValidator(dateField1: string, dateField2: string): ValidatorFn {
        return  (frmgroup: FormGroup): { [key: string]: any } => {
            const startDate = frmgroup.controls[dateField1].value;
            const endDate = frmgroup.controls[dateField2].value;
            const isValid = endDate >= startDate;
            return (!isValid) ? { endDateIsNotGreaterEqualThanStartDate: true } : null;
        };
    }
}
