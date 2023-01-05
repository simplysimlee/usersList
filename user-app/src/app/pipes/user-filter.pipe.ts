import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../models/user-interface';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: User[], args:any ): User[] {
    if(!value)return [];
      if(!args?.trim())return value;

      if(typeof(+args) === 'number'){
        const matchedId  = value.find(dt=> dt.id === +args);
        return matchedId ? [matchedId] : [];
      }else{
        args = args?.toString()?.toLowerCase()?.trim();
        return  value.filter(dt=>
           dt.displayName.toLowerCase()?.trim()?.includes(args) ||  dt.givenName.toLowerCase()?.trim()?.includes(args)
        ) ;
      }


     
  }

}
