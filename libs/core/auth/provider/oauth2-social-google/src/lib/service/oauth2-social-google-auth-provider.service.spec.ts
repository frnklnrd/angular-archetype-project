import { TestBed } from '@angular/core/testing';

import { Oauth2SocialGoogleAuthProviderService } from './oauth2-social-google-auth-provider.service';

describe('Oauth2SocialGoogleAuthProviderService', () => {
  let service: Oauth2SocialGoogleAuthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth2SocialGoogleAuthProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
