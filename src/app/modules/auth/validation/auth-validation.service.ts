import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable()
export class AuthValidationService {
  constructor() {}

  public usernameSpecialSymbols(control: AbstractControl): ValidationErrors | null {
    if (!control.value?.trim()) {
      return null;
    }
    const isValid: boolean = /^[а-яА-ЯёЁa-zA-Z]+$/.test(control.value);
    return isValid ? null : { usernameSymbols: 'Используйте только буквы' };
  }

  public passwordSpecialSymbols(control: AbstractControl): ValidationErrors | null {
    if (!control.value?.trim()) {
      return null;
    }
    const isValid: boolean = /^[a-zA-Z0-9]+$/.test(control.value);
    return isValid
      ? null
      : { passwordSymbols: 'Пароль должен содержать только латинские буквы и цифры' };
  }

  public equalValidator({ value }: FormGroup): ValidationErrors | null {
    const [password1, password2] = Object.values(value);
    return password1 === password2
      ? null
      : {
          password: 'Пароли не совпадают',
        };
  }
}
