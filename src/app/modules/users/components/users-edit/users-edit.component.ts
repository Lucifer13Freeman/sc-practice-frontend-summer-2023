import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent {
  @Input() form!: FormGroup;
  @Input() title = '';
  @Output() eventClick: EventEmitter<void> = new EventEmitter<void>();

  isShownPassword = false;

  public cities = [
    { value: '', name: 'Выберите из списка...' },
    { value: 'yaroslavl', name: 'Ярославль' },
    { value: 'moscow', name: 'Москва' },
    { value: 'petersburg', name: 'Санкт-Петербург' },
    { value: 'samara', name: 'Самара' },
    { value: 'perm', name: 'Пермь' },
  ];
  public schools = [
    { value: '', name: 'Выберите из списка...' },
    { value: 'petersburg', name: '11' },
    { value: 'samara', name: '22' },
    { value: 'perm', name: '33' },
  ];
  public classRooms = [
    { value: '', name: 'Выберите из списка...' },
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
  ];

  closeModal() {
    this.eventClick.emit();
    console.log(this.form.value);
  }
}
