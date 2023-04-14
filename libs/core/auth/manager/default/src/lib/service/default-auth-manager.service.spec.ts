import { TestBed } from '@angular/core/testing';
import { DefaultAuthManagerService } from './default-auth-manager.service';

describe('DefaultAuthManagerService', () => {
  let service: DefaultAuthManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultAuthManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
