import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let url = '../assets/users.json';
  const user = {
    "users":[
      {
        "id":1,
        "displayName":"John One",
        "givenName":"John",
        "mail":"John@one.com",
        "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
      },
      {
        "id":2,
        "displayName":"John Two",
        "givenName":"John",
        "mail":"John@two.com",
        "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
      },
       {
        "id":3,
        "displayName":"John Three",
        "givenName":"John",
        "mail":"John@three.com",
        "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
      },
      {
        "id":4,
        "displayName":"John Four",
        "givenName":"John",
        "mail":"John@four.com",
        "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
      },
      {
        "id":5,
        "displayName":"John Five",
        "givenName":"John",
        "mail":"John@five.com",
        "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
      }
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get API call', () => {
    
    service.getUsers().subscribe((res) => {
      expect(res).toEqual(user.users);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });
    req.flush(user);
  });

  it('test for method name is get', () => {
    
    service.getUsers().subscribe((res) => {
      expect(res).toEqual(user.users);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });
    req.flush(user);
    expect(req.request.method).toEqual('GET');

  });

  it('can test for network error', () => {
    const emsg = ' network error';

    service.getUsers().subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );

    const req = httpController.expectOne(url);

    
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
     
    });

    // Respond with mock error
    req.error(mockError);
  });
});
