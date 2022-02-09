import { TestBed } from '@angular/core/testing';

import { UserRegistationService } from './user-registation.service';

describe('UserRegistationService', () => {
  let service: UserRegistationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
