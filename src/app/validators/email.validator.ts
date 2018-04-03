import { AbstractControl } from '@angular/forms';

export function ValidateEmail(control: AbstractControl) {
    console.log({control});
    let email = control.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()) === true) {
        console.log('valid!');
        return null;
    } else {
        return { validEmail: true };
    }
}