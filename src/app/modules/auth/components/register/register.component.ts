import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegisterSuccessModalComponent } from '../../modals/register-success/register-success-modal.component';
import {
  IRegisterDataStudent,
  IRegisterDataTeacher,
} from '../../interfaces/register-data.interface';
import { AuthValidationService } from '../../validation/auth-validation.service';
import { ModalService } from '../../../core/modules/modal/modal.service';
import { Store } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from '../../store/auth.state';

interface ISelectViewData {
  value: string;
  name: string;
}

type TControlNameTeacher = keyof IRegisterDataTeacher | 'password1' | 'password2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public isShownPassword1: boolean = false;
  public isShownPassword2: boolean = false;
  public role: string = 'teacher';

  public cities: ISelectViewData[] = [
    { value: '', name: 'Выберите из списка...' },
    { value: 'yaroslavl', name: 'Ярославль' },
    { value: 'moscow', name: 'Москва' },
    { value: 'petersburg', name: 'Санкт-Петербург' },
    { value: 'samara', name: 'Самара' },
    { value: 'perm', name: 'Пермь' },
  ];
  // Добавил массив предпочтений
  public preferences = [
    { value: 'Футбол', name: 'Футбол' },
    { value: 'Волейбол', name: 'Волейбол' },
    { value: 'Хоккей', name: 'Хоккей' },
  ];
  // поменял values у школ
  public schools: ISelectViewData[] = [
    { value: '', name: 'Выберите из списка...' },
    { value: '№11', name: '№11' },
    { value: '№22', name: '№22' },
    { value: '№33', name: '№33' },
  ];
  public classRooms: ISelectViewData[] = [
    { value: '', name: 'Выберите из списка...' },
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
  ];

  constructor(
    private readonly store: Store<{ [AUTH_STATE_NAME]: AuthState }>,
    private readonly fb: FormBuilder,
    private readonly modalService: ModalService,
    private readonly validationService: AuthValidationService
  ) {}
  ngOnInit(): void {
    const usernameValidators: ValidatorFn[] = [
      this.validationService.usernameSpecialSymbols,
      Validators.minLength(3),
      Validators.maxLength(40),
    ];
    const passwordValidators: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(8),
      this.validationService.passwordSpecialSymbols,
    ];
    // Добавил сюда предпочтения
    this.form = this.fb.group({
      surname: ['', [...usernameValidators, Validators.required]],
      name: ['', [...usernameValidators, Validators.required]],
      patronymic: ['', usernameValidators],
      city: ['', []],
      role: ['', []],
      phone: ['', []],
      birthday: ['', []],
      preferences: ['', []],
      school: ['', []],
      classRoom: ['', []],
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.email],
      ],
      password: this.fb.group(
        {
          password1: ['', passwordValidators],
          password2: ['', passwordValidators],
        },
        {
          validators: [this.validationService.equalValidator],
        }
      ),
    });
  }
  //Добавил предпочтения
  public submit(): void {
    if (this.form.controls['role'].value == 'Учитель') {
      const formSubmit: IRegisterDataTeacher = {
        surname: this.form.controls['surname'].value,
        name: this.form.controls['name'].value,
        role: this.form.controls['role'].value,
        patronymic: this.form.controls['patronymic'].value,
        phone: this.form.controls['phone'].value,
        birthday: this.form.controls['birthday'].value,
        email: this.form.controls['email'].value,
        city: this.form.controls['city'].value,
        school: this.form.controls['school'].value,
        classRoom: this.form.controls['classRoom'].value,
        password: this.form.controls['password'].value['password'],
      };
      console.log(formSubmit);
      this.modalService.open({
        component: RegisterSuccessModalComponent,
        context: formSubmit,
      });
    } else {
      const formSubmit: IRegisterDataStudent = {
        surname: this.form.controls['surname'].value,
        name: this.form.controls['name'].value,
        role: this.form.controls['role'].value,
        patronymic: this.form.controls['patronymic'].value,
        phone: this.form.controls['phone'].value,
        birthday: this.form.controls['birthday'].value,
        email: this.form.controls['email'].value,
        city: this.form.controls['city'].value,
        preferences: this.form.controls['preferences'].value,
        school: this.form.controls['school'].value,
        classRoom: this.form.controls['classRoom'].value,
        password: this.form.controls['password'].value['password'],
      };
      console.log(formSubmit);
      this.modalService.open({
        component: RegisterSuccessModalComponent,
        context: formSubmit,
      });
    }
  }
  public hasError(controlName: TControlNameTeacher): boolean {
    if (controlName.includes('password')) {
      const passwordGroup = this.form.get('password');
      const password = passwordGroup?.get(controlName);
      return (
        !!(passwordGroup?.invalid && passwordGroup?.touched && passwordGroup?.dirty) ||
        !!(password?.invalid && password?.touched && password?.dirty)
      );
    }
    return !!(
      this.form.get(controlName)?.invalid &&
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.dirty
    );
  }

  public getErrors(controlName: TControlNameTeacher): string {
    if (controlName.includes('password')) {
      const passwordGroup = this.form.get('password');
      return [
        ...Object.values(passwordGroup?.errors ?? []),
        ...Object.values(passwordGroup?.get(controlName)?.errors ?? []),
      ]
        .filter((v) => typeof v === 'string' || v instanceof String)
        .join('; ');
    }
    return Object.values(this.form.get(controlName)?.errors ?? [])
      .filter((v) => typeof v === 'string' || v instanceof String)
      .join('; ');
  }

  protected readonly console = console;
}
