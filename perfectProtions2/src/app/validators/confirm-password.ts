import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const newPass = control.get('password');
	const confirmPass = control.get('confirmPassword');
	return newPass && confirmPass && newPass.value !== confirmPass.value ? { passwordsDiffer: true } : null;
};

export const changePasswordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const newPass = control.get('newPassword');
	const confirmPass = control.get('confirmPassword');
	return newPass && confirmPass && newPass.value !== confirmPass.value ? { passwordsDiffer: true } : null;
};

export function matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
	return (control: AbstractControl): ValidationErrors | null => {
		return !!control.parent &&
			!!control.parent.value &&
			control.value === control.parent.controls[matchTo].value
			? null
			: { isMatching: true };
	};
}
