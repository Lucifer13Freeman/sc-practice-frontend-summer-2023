import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService],
})
export class UsersComponent implements OnInit {
  usersData: any = {
    filterTourneys: [],
    users: [],
  };
  viewModal = 0;
  lockMessage = '';
  userId = 0;
  formEdit: FormGroup = this.fb.group({
    surname: ['', []],
    username: ['', []],
    patronymic: ['', []],
    email: ['', []],
    city: ['', []],
    school: ['', []],
    classRoom: ['', []],
    password: ['', []],
    repeatPassword: ['', []],
  });

  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  filters = new FormControl();

  // filtersTypeView: string[] = [
  //   'баскетбол',
  //   'футбол',
  //   'теннис',
  //   'волейбол',
  //   'плавание',
  //   'настольный теннис',
  // ];
  filtersTourneysView = [
    { value: 'FIO', viewValue: 'ФИО' },
    { value: 'city', viewValue: 'Городу' },
    { value: 'school', viewValue: 'Школе' },
    { value: 'classroom', viewValue: 'Классу' },
  ];

  filtersTotal = {
    searchValue: '',
    filterType: '',
    filterTourneys: [],
  };

  ngOnInit(): void {
    this.usersService.getUsersData().subscribe((response: any) => {
      this.usersData = response;
      this.cdr.detectChanges();
    });
  }

  resetSearchValue() {
    this.filtersTotal.searchValue = '';
  }

  sendFilter() {
    this.filtersTotal.filterTourneys = this.filters.value;
  }

  closeModal() {
    this.viewModal = 0;
  }

  openModal(count: number) {
    this.viewModal = count;
  }

  identificationModal(count: number, id: number) {
    if (count === 3) this.userId = id;
    this.viewModal = count;
  }

  sendLock() {
    this.usersService.lockUser(this.lockMessage);
    this.lockMessage = '';
    this.viewModal = 0;
  }

  sendDelete() {
    this.usersService.deleteUser(this.userId);
    this.viewModal = 0;
  }
}
