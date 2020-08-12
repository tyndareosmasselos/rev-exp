import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Directive } from '@angular/core';

export const ANY_DATE_FORMAT = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

@Directive({
    selector: '[anyDateFormat]',
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: ANY_DATE_FORMAT },
    ],
})
export class AnyDateFormat {
}