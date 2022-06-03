import { Injectable } from '@angular/core';
import { OktaAuth, UserClaims } from '@okta/okta-auth-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OktaService {

  constructor(
    private authClient: OktaAuth
  ) {  }

  private isUserAuthenticated = new Observable<boolean>(observer => {
    from(this.authClient.isAuthenticated()).subscribe(isAuth => observer.next(isAuth));
  });

  get isUserAuthenticated$(){
    return this.isUserAuthenticated;
  }

  public login(fromUri: string) {
    this.authClient.setOriginalUri(fromUri);
    this.authClient.signInWithRedirect();
  }

  public logout(): void {
    this.authClient.signOut();
  }

  public async handleAuthentication() {
    await this.authClient.storeTokensFromRedirect();
    return this.authClient.getOriginalUri();
  }

  public getUserInfo(): Observable<UserClaims> {
    return from(this.authClient.getUser());
  }

  public getAccessToken(): string {
    return this.authClient.getAccessToken() ?? '';
  }
}
