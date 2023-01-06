import { Component, ViewChild } from '@angular/core';
import { HttpService } from './services/http.service';
import { User } from './models/user-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewDetailsComponent } from './shared/view-details/view-details.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app';
  //User data List
  userListData: User[] = [];
  // search Query
  query: string = '';
  // Error message
  serverError: string = '';
  // Modal
  @ViewChild('viewDetails', { static: false }) openViewDetails: ViewDetailsComponent | undefined;
  // user which is clicked and data needs to be view in the child modal
  selectedUser!: User;

  constructor(readonly http: HttpService,
    private readonly localStorageService: LocalStorageService) { }

  ngOnInit() {
    //Load User List data
    this.getUserListData();
  }

  /**
   * This methods is used to load user data
   * 
   */
  getUserListData() {
    this.http.getUsers()
      .subscribe({
        next: (userList: User[]) => {
          if (userList?.length) {
            this.localStorageService.setItemToLocalStorage('userslistArray', userList);
            this.userListData = userList;
            this.serverError = '';
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(JSON.stringify(err));
          this.userListData = [];
          this.localStorageService.setItemToLocalStorage('userslistArray', []);
          this.serverError = err?.message || 'An Error has Occured, Please Connect to Admin.';
        },
      });
  }

  /**
   * This method reloads component if data gets updated in the child componeny
   */
  reloadUsers() {
    this.userListData = this.localStorageService.getItemFromLocalStorage('userslistArray');
  }

  /**
   * Opens the View details modal
   */
  openViewDetailsModal(item: User) {
    this.selectedUser = item;
    this.openViewDetails?.open();
  }

}
