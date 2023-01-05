import { Injectable } from '@angular/core';
import { User } from '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  /**
   * this stores into LS
   * @param id -string
   * @param data - User []
   */
  setItemToLocalStorage(id: string, data: User[]) {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem(id, stringifyData);
  };
  /**
   * retrives data from LS
   * @param id 
   * @returns User[]
   */
  getItemFromLocalStorage(id: string): User[] {
    return JSON.parse(localStorage.getItem(id) || '');
  };

}
