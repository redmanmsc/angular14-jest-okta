import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { ActivatedRoute, Router } from '@angular/router';

import { OktaAuth } from '@okta/okta-auth-js';
import { OktaService } from '../authentication/okta.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let route: ActivatedRoute;
  let router: Router;
  const oktaAuth = new OktaAuth({issuer: "https://This.is.a.fake.url.that.is.required.for.OktaAuth"});
  const oktaService = new OktaService(oktaAuth);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: OktaAuth, useValue: oktaAuth },
        { provide: OktaService, useValue: oktaService }
      ]
    });
    guard = TestBed.inject(AuthGuard);

    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
