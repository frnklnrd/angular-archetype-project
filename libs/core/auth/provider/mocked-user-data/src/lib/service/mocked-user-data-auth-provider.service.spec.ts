import { TestBed } from '@angular/core/testing';

import { MockedUserDataAuthProviderService } from './mocked-user-data-auth-provider.service';

describe('MockedUserDataAuthProviderService', () => {
  let service: MockedUserDataAuthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedUserDataAuthProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
