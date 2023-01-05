import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {
  usersForm:FormGroup;
  @ViewChild('viewDetails', { static: false })modal!: ElementRef;
  @Input() userDtls!: User;
  @Output() reloadPage = new EventEmitter<string>();

  constructor(private readonly fb: FormBuilder,
              private readonly localStorageService: LocalStorageService) {
    /**
     * Initializing the form builder
     */
    this.usersForm = this.fb.group({
      id: [{value:'', disabled: true}],
      displayName:['',Validators.required],
      givenName: [''],
      mail: ['', [Validators.required, Validators.email]],
      details:['']
    });
    
  }

  ngOnChanges() {
    /**
     * When input changes
     */
   if(this.userDtls) this.rebuildForm();
  }

  /**
   * Reload the form data
   */
  rebuildForm(){
    const { id, displayName, givenName, mail, details } = this.userDtls;
    this.usersForm.reset({
      id: id,
      displayName: displayName,
      givenName: givenName,
      mail: mail,
      details:details
    });
  }

  /**
   * Open Modal
   */

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  /**
   * On form submit
   */
  onSubmit(){
    if(this.usersForm.dirty && this.usersForm.valid){
      // retrive data from local storage
      const userArray:User[] = this.localStorageService.getItemFromLocalStorage('userslistArray'); 
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
      const { displayName, givenName, mail, details } = this.usersForm.value;
      updatedUser['displayName'] = displayName;
      updatedUser['givenName'] = givenName;
      updatedUser['mail'] = mail;
      updatedUser['details'] = details;
    }
    //update the local storage
    this.localStorageService.setItemToLocalStorage('userslistArray', userArray);
  }

  /**
   * Close Modal
   */
  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
