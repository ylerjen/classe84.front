import { Injectable } from '@angular/core';
import { Validator, FormGroup, AbstractControl } from '@angular/forms';

export class CustomValidators {

    static matchingFields(...fieldList: Array<string>): Object | null {
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
                }
            }

            return (!isValid) ? { mismatchedFields: true } : null;
        };
    }
}
