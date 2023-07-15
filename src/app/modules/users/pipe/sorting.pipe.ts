import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortingUsers',
})
export class SortingUsersPipe implements PipeTransform {
  transform(users: any, search: string) {
    console.log(search);
    if (search.length === 0) return users;
    if (search === 'FIO') {
      return users.sort((a: any, b: any) => {
        const nameA = a.name.trim().toLowerCase();
        const nameB = b.name.trim().toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else return 0;
      });
    } else if (search === 'city') {
      return users.sort((a: any, b: any) => {
        const cityA = a.title.city.trim().toLowerCase();
        const cityB = b.title.city.trim().toLowerCase();

        if (cityA < cityB) {
          return -1;
        } else if (cityA > cityB) {
          return 1;
        } else return 0;
      });
    } else if (search === 'school') {
      return users.sort((a: any, b: any) => {
        const schoolA = Number(a.title.school.trim().toLowerCase().substr(6));
        const schoolB = Number(b.title.school.trim().toLowerCase().substr(6));

        return schoolA - schoolB;
      });
    } else if (search === 'classroom') {
      return users.sort((a: any, b: any) => {
        const classroomA = parseInt(a.title.classroom.trim().toLowerCase().slice(0, -1));
        const classroomB = parseInt(b.title.classroom.trim().toLowerCase().slice(0, -1));

        if (classroomA < classroomB) {
          return -1;
        } else if (classroomA > classroomB) {
          return 1;
        } else return 0;
      });
    } else {
      return users;
    }
  }
}
