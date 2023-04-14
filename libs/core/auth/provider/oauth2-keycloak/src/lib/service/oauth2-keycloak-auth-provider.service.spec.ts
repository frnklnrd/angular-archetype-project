import { TestBed } from '@angular/core/testing';

import { Oauth2KeycloakAuthProviderService } from './oauth2-keycloak-auth-provider.service';

describe('Oauth2KeycloakAuthProviderService', () => {
  let service: Oauth2KeycloakAuthProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth2KeycloakAuthProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
