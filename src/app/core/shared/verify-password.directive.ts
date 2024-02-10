import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const verifyPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('confirm_password');

  return password && passwordConfirm && password.value !== passwordConfirm.value ? {'passwordDoNotMatch': true} : null;
};
