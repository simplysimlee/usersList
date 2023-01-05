import { Component, ViewChild } from '@angular/core';
import { HttpService } from './services/http.service';
import { User } from './models/user-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewDetailsComponent } from './shared/view-details/view-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app';
  userListData: User[] = [];
  query:string = '';
  serverError:string = '';
  @ViewChild('viewDetails', { static: false })
  openViewDetails!: ViewDetailsComponent;
  selectedUser!: User;

  constructor(private readonly http: HttpService) { }

  ngOnInit() {
    //Load User List data
    this.getUserListData();
  }

  /**
   * This methods is used to load user data
   * 
   */
  private getUserListData() {
    this.http.getUsers()
      .subscribe({
        next: (userList: User[]) => {
          if (userList?.length) {
            localStorage.setItem('userslistArray', JSON.stringify(userList));
            this.userListData = userList;
            this.serverError = '';
          }
        },
        error: (err: HttpErrorResponse) => {
          this.userListData = [];
          localStorage.setItem('userslistArray', JSON.stringify([]));
          this.serverError = err?.status === 404 ? 'Records No Found.' : 'An Error has Occured, Please Connect to Admin.';
        },
      });
  }

  reloadUsers(){
    this.userListData = JSON.parse(localStorage.getItem('userslistArray')||'');
  }

  /**
   * Opens the View details modal
   */
  openViewDetailsModal(item:User) {
    this.selectedUser = item;
    this.openViewDetails.open();
  }
 

  

}
