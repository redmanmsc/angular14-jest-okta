import { TestBed } from '@angular/core/testing';
import { OktaService } from './okta.service';
import { OktaAuth } from '@okta/okta-auth-js';


describe('OktaService', () => {
  let service: OktaService
  const oktaAuth = new OktaAuth({issuer: "https://This.is.a.fake.url.that.is.required.for.OktaAuth"});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers: [
        { provide: OktaAuth, useValue: oktaAuth },
      ]
    });
    service = TestBed.inject(OktaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
