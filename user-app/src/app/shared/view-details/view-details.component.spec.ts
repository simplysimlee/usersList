import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { ViewDetailsComponent } from './view-details.component';

describe('ViewDetailsComponent', () => {
  let component: ViewDetailsComponent;
  let fixture: ComponentFixture<ViewDetailsComponent>;


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
        ViewDetailsComponent,
      ],
      providers: [LocalStorageService]

    }).compileComponents();
    fixture = TestBed.createComponent(ViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  TEST @INPUT param', () => {
    component.userDtls = {
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    };
    component.rebuildForm();
    fixture.detectChanges();
    expect(component.usersForm.value.givenName).toEqual("John");
  });

  it('should open modal ', () => {

    component.open();
    expect(component.modal.nativeElement.style.display).toEqual('block');
    fixture.detectChanges();
  });

  it('should close modal', () => {
    component.userDtls = {
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    } ;
    component.cancel();
    component.close();
    expect(component.modal.nativeElement.style.display).toEqual('none');
    fixture.detectChanges();
  });

  it('should  allow form submit if no errors present', () => {
    component.usersForm.patchValue({
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    });
    //component.usersForm.removeValidators(Va);
    fixture.detectChanges();
    component.onSubmit();
    component.userDtls = {
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    } ;
    
    component.updateUserData([{
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    } ] );
    expect(component.modal.nativeElement.style.display).toEqual('none');
    fixture.detectChanges();
  });

  it('should  allow form submit if  errors are present', () => {
    component.usersForm.value.displayName = null;
    component.onSubmit();
    component.userDtls = {
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    } ;
    
    component.updateUserData([{
      "id": 7,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    } ] );
    expect(component.modal.nativeElement.style.display).toEqual('none');
    fixture.detectChanges();
  });

  

  it('should invoke ng on changes methods', () => {
    component.userDtls= {
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    } 
    component.ngOnChanges();
    expect(component.usersForm.value.mail).toEqual("John@two.com");
    fixture.detectChanges();
  });

  it('should save data only when form value is dirty', () => {
    component.userDtls= {
      "id": 2,
      "displayName": "John Two",
      "givenName": "John",
      "mail": "John@two.com",
      "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    } 

    component.usersForm.markAsTouched() ;
    component.usersForm.markAsDirty() ;
    fixture.detectChanges();
    component.onSubmit();
  });
});
