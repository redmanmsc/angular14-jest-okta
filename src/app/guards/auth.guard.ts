import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  UrlSegment, UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OktaService } from '../authentication/okta.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private oktaService: OktaService,
    private location: Location
  ) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthenticatedUser(route, segments.join('/').concat(window.location.search));
  }

  canActivate(route: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthenticatedUser(route, url);
  }

  checkAuthenticatedUser(route: ActivatedRouteSnapshot | Route, url?: string): Observable<boolean> {
    return this.oktaService.isUserAuthenticated$.pipe(
      switchMap(authenticated => {
        if (!authenticated) {
          const redirectUrl = this.location.prepareExternalUrl(url ?? '/');
          this.oktaService.login(redirectUrl);
          return of(false);
        }
        return of(true);
      }));
  }

}
