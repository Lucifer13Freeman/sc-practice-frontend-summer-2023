export interface IRegisterDataTeacher {
  surname: string;
  name: string;
  patronymic: string;
  phone: number;
  birthday: Date;
  role: string;
  email: string;
  city: string;
  school: string;
  classRoom: string;
  password: string;
}
export interface IRegisterDataStudent {
  surname: string;
  name: string;
  patronymic: string;
  phone: number;
  birthday: Date;
  role: string;
  email: string;
  city: string;
  // предпочитаемые соревнования
  preferences: [];
  school: string;
  classRoom: string;
  password: string;
}
