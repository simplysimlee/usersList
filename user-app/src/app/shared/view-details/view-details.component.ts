import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-interface';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {
  usersForm:FormGroup;
  @ViewChild('viewDetails', { static: false })
  modal!: ElementRef;
  @Input() userDtls!: User;
  @Output() reloadPage = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.usersForm = this.fb.group({
      id: [{value:'', disabled: true}],
      displayName:['',Validators.required],
      givenName: [''],
      mail: ['', [Validators.required, Validators.email]],
      details:['']
    });
    
  }

  ngOnChanges() {
   if(this.userDtls) this.rebuildForm();
  }

  rebuildForm(){
    
    this.usersForm.reset({
      id: this.userDtls.id,
      displayName: this.userDtls.displayName,
      givenName: this.userDtls.givenName,
      mail: this.userDtls.mail,
      details:this.userDtls.details
    });
  }

  /**
   * Open Modal
   */

  open() {
    this.modal.nativeElement.style.display = 'block';
  }
  onSubmit(){
    if(this.usersForm.dirty && this.usersForm.valid){
      // retrive date from ls
      const userDetails = localStorage.getItem('userslistArray') || '';
      // parse to JSON fromat
      const userArray:User[] = JSON.parse(userDetails) || [];
      // check for value that is updated
      this.updateUserData(userArray);
      //this emitter will reload the user list on home page
      this.reloadPage.emit();
    }
     this.close();
  }

  /**
   * This methods updates the changed data to LS
   * @param userArray 
   */
  private updateUserData(userArray: User[]) {
    const updatedUser = userArray.find(data => data.id === this.userDtls.id) || null;
    if (updatedUser) {
      updatedUser['displayName'] = this.usersForm.value.displayName || '';
      updatedUser['givenName'] = this.usersForm.value.givenName || '';
      updatedUser['mail'] = this.usersForm.value.mail || '';
      updatedUser['details'] = this.usersForm.value.details || '';
    }
    //update the local storage
    localStorage.setItem('userslistArray', JSON.stringify(userArray));
  }

  /**
   * Close Modal
   */
  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
