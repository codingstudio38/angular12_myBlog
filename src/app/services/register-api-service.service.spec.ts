import { TestBed } from '@angular/core/testing';

import { RegisterApiServiceService } from './register-api-service.service';

describe('RegisterApiServiceService', () => {
  let service: RegisterApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
