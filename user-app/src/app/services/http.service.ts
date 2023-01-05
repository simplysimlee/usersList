import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import {  map,catchError } from 'rxjs/operators';

import {User,UserObject} from '../models/user-interface';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private readonly http: HttpClient) {}
  private url = '../assets/users.json';

  /**
   * getUsers()
   * This methods is used to perfrom get call to HTTP client
   * @returns Observable<User[]>
   */
  getUsers(): Observable<User[]> {
    return this.http.get<UserObject>(this.url)
    .pipe(
      map(data=> data?.users || []),
       catchError((err)=> throwError(() => err))
    );
  }
}
