import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ViewDetailsComponent } from './shared/view-details/view-details.component';
import { HttpService } from './services/http.service';
import { UserObject } from './models/user-interface';
import { Data } from '@angular/router';
import { Observable, throwError } from 'rxjs';

const data = {
  "users": [
    {
      "id": 1,
      "displayName": "John One",
      "givenName": "John",
      "mail": "John@one.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    },
    {
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    },

  ]
}
@Pipe({ name: 'userFilter' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    //Do stuff here, if you want
    return value;
  }
}
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

      ],
      declarations: [
        AppComponent,
        ViewDetailsComponent,
        MockPipe
      ],

    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should load all data on load`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.ngOnInit()).toBeUndefined();
  });

  it(`should have as title 'user-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('user-app');
  });

  it(`should have as openViewDetailsModal been called`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.openViewDetailsModal({
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    });
    expect(app.selectedUser.id).toEqual(2);

  });

  it(`should reload page from local storage data`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.reloadUsers();
    expect(app.userListData).toBeDefined();
  });

  it('should expect defined error message in case of error', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.reloadUsers();
    spyOn(app.http, 'getUsers').and.returnValue(throwError(() => new Error()));
    app.getUserListData();
    expect(app.serverError).toEqual('An Error has Occured, Please Connect to Admin.');
  })

  it('should give 404 error', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.reloadUsers();
    spyOn(app.http, 'getUsers').and.returnValue(throwError(() => {
      const errObj  =  new HttpErrorResponse({"status":404,"statusText":"Not Found","url":"http://localhost:4200/assets/usersoo.json",});
    }));
    app.getUserListData();
    expect(app.serverError).toBeTruthy();
  })

});







