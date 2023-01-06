import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService positive test cases', () => {
  let service: LocalStorageService;
  const user = [
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
    }]
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    service.setItemToLocalStorage('i', user);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Local storage Service should store data and retrive ', () => {
   
    expect(service.getItemFromLocalStorage('i')).toEqual(user);
  });
});

describe('LocalStorageService negative test cases', () => {
  let service: LocalStorageService;
  const user = null;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    service.setItemToLocalStorage('i', user);
  });


  it('Negative test -Local storage Service should store data and retrive ', () => {
    expect(service.getItemFromLocalStorage('i')).toEqual([]);
  });

});
