import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: any, search: string) {
    if (search.length === 0) return users;
    return users.filter(
      (user: {
        id: number;
        name: string;
        title: {
          city: string;
          school: string;
          classroom: string;
        };
        endtourneys: {
          name: string;
          value: string;
        }[];
        starttourneys: {
          name: string;
          value: string;
        }[];
      }) => {
        return JSON.stringify(user).toLowerCase().includes(search.toLowerCase());
      }
    );
  }
}
