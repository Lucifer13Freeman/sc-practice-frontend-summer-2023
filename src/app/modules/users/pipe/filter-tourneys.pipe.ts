import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTourneys',
})
export class FilterTourneysPipe implements PipeTransform {
  transform(users: any, tourneys: any[]) {
    if (tourneys === null) return users;
    return users.filter((user: any) => {
      return tourneys.every((value) => JSON.stringify(user).includes(value));
    });
  }
}
