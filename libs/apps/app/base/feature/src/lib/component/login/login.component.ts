/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProviderType } from '@app/core/auth/api';
import {
  AUTH_MANAGER_SERVICE,
  AuthManagerService,
} from '@app/core/auth/manager/api';
import { AbstractFeatureComponent } from '@app/core/ddd/api';
import { Store } from '@ngxs/store';
import { marker as _i18n } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends AbstractFeatureComponent
  implements OnInit, OnDestroy
{
  // ----------------------------------------------------------------

  private auth: AuthManagerService =
    inject<AuthManagerService>(AUTH_MANAGER_SERVICE);

  private store: Store = inject<Store>(Store);

  private fb: FormBuilder = inject<FormBuilder>(FormBuilder);

  // ----------------------------------------------------------------

  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    rememberme: [false, []],
  });

  // ----------------------------------------------------------------

  providersConfig = [
    {
      id: 'SUITECRM7_V8',
      enabled: this.store.selectSnapshot(
        (state) => state.config.auth.providers.suitecrm7_v8.enabled
      ),
      color: 'info',
      icon: 'cil3d',
      title: _i18n('app.login.provider.SUITECRM7_V8.title')
    },
    {
      id: 'LARAVEL9',
      enabled: this.store.selectSnapshot(
        (state) => state.config.auth.providers.laravel9.enabled
      ),
      color: 'success',
      icon: 'cib-laravel',
      title: _i18n('app.login.provider.LARAVEL9.title')
    },
    {
      id: 'OAUTH2_SOCIAL_GOOGLE',
      enabled: this.store.selectSnapshot(
        (state) => state.config.auth.providers.social.google.enabled
      ),
      color: 'danger',
      icon: 'cib-google',
      title: _i18n('app.login.provider.OAUTH2_SOCIAL_GOOGLE.title')
    },
    {
      id: 'OAUTH2_SOCIAL_FACEBOOK',
      enabled: this.store.selectSnapshot(
        (state) => state.config.auth.providers.social.facebook.enabled
      ),
      color: 'primary',
      icon: 'cib-facebook',
      title: _i18n('app.login.provider.OAUTH2_SOCIAL_FACEBOOK.title')
    },
    {
      id: 'OAUTH2_KEYCLOAK',
      enabled: this.store.selectSnapshot(
        (state) => state.config.auth.providers.keycloak.enabled
      ),
      color: 'warning',
      icon: 'cil-lock-locked',
      title: _i18n('app.login.provider.OAUTH2_KEYCLOAK.title')
    },
    {
      id: 'MOCKED_USER_DATA',
      enabled: this.store.selectSnapshot(
        (state) => state.config.auth.providers.mocked_user_data.enabled
      ),
      color: 'secondary',
      icon: 'cil-puzzle',
      title: _i18n('app.login.provider.MOCKED_USER_DATA.title')
    },
  ];

  activeProviderId = '';

  // ----------------------------------------------------------------

  override ngOnInit(): void {
    super.ngOnInit();
    const defaultProviderId: string = this.store.selectSnapshot(
      (state) => state.auth.provider?.providerId
    );
    if (defaultProviderId){
      this.activeProviderId = defaultProviderId
    } else {
      const enabledProvides = this.providersConfig.filter((prov) => prov.enabled);
      if (enabledProvides.length> 0){
        this.activeAsDefault(enabledProvides[0].id);
      }

    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // ---------------------------------------

  isActive(key: string = ''): boolean {
    return this.activeProviderId === key;
  }

  activeAsDefault(key: string = ''): void {
    this.auth.configureAsDefault(key, null).then((result) => {
      this.logger.console.log(
        this.__classname,
        'auth -> configured ok',
        key,
        result
      );
      this.activeProviderId = key;
    });
  }

  // ---------------------------------------

  public login(): void {
    const defaultProvider: string = this.store.selectSnapshot(
      (state) => state.auth.provider?.providerId
    );

    let loginData: any = {};
    if (defaultProvider === AuthProviderType.SUITECRM7V8) {
      if (!this.form.valid) {
        return;
      }
      loginData = {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
      };
    } else if (defaultProvider === AuthProviderType.LARAVEL9) {
      if (!this.form.valid) {
        return;
      }
      loginData = {
        email: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
        remember_me: this.form.get('rememberme')?.value,
      };
    }
    this.loginWidthDefault(loginData);
  }

  // ---------------------------------------

  private loginWidthDefault(data: any = {}): void {
    this.startLoader('loginWidthDefault');

    this.auth
      .login(data)
      .then((result) => {
        this.endLoader('loginWidthDefault');

        if (result) {
          this.logger.console.log(this.__classname, 'auth -> login OK', result);
          setTimeout(() => {
            this.auth.dispatchLoginSuccessfully();
          }, 500);
        } else {
          this.logger.console.log(
            this.__classname,
            'auth -> login NOT OK',
            result
          );
        }
      })
      .catch((e) => {
        this.endLoader('loginWidthDefault');

        this.logger.console.log(this.__classname, 'auth -> login error', e);
        this.logger.console.error(e);
      });
  }

  // ---------------------------------------
}
