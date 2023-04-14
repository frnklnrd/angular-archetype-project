import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTH_PROVIDER_SERVICE } from '@app/core/auth/provider/api';
import { MockedUserDataAuthProviderService } from './service/mocked-user-data-auth-provider.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: AUTH_PROVIDER_SERVICE,
      useExisting: MockedUserDataAuthProviderService,
      multi: true,
    },
    MockedUserDataAuthProviderService,
  ],
})
export class CoreAuthProviderMockedUserDataModule {}
