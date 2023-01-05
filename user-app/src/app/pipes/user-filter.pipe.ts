import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user-interface';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: User[], args: string): User[] {
    if (!value) return [];
    if (!args?.trim()) return value;
    args = args?.toString()?.toLowerCase()?.trim();
    return value.filter(dt => {
      const { id, givenName, displayName } = dt;
      return id.toString().includes(args) || displayName.toLowerCase()?.includes(args) || givenName.toLowerCase()?.includes(args);
    }
    );
  }

}
