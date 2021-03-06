import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { parseParams, redirectTo, generateSig } from 'app/util/util';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CONSUMER_KEY } from "app/keys";
import { REST_API } from "app/API_ENDPOINTS";

@Injectable()
export class AuthService {
  private authinticated: boolean;

  constructor(
    private http: Http,
    private router: Router,
  ) { }

  //
  isAuthenticated(): boolean {
    return this.authinticated;
  }

  // logs user in and requests permissions
  private login(loginPage) {
    const permissions: string = 'delete';
    let signature: string = generateSig(['perms' + permissions]);

    // options for the login request like the app's unique key and permissions required
    const options: Params = {
      api_key: CONSUMER_KEY,
      perms: permissions,
      api_sig: signature
    }

    // redirect to flickr's login interface
    redirectTo(loginPage + parseParams(options));
  }

  userLogin() {
    const loginPage: string = 'http://www.flickr.com/services/auth/?';
    this.login(loginPage)
  }

  // requires frob to be authenticated
  authenticate(frob: string) {
    this.authinticated = true;
    this.router.navigate(['dashboard'])
    return this.getToken(frob)
  }
  getToken(frob: string): Observable<Response> {
    // getting user's token params
    // not a cool format but the most modular and usable one by far =D
    const params: Params = {
      api_key: CONSUMER_KEY,
      api_sig: generateSig([
        'method' + 'flickr.auth.getToken',
        'format' + 'json',
        'frob' + frob,
        'nojsoncallback' + '1'
      ]),
      'format': 'json',
      'frob': frob,
      'method': 'flickr.auth.getToken',
      'nojsoncallback': 1,
    }
    // give control back so that the token is given to who requested it
    return this.http.get(REST_API + parseParams(params))
  }
  stayLoggedIn(token: string) {
    localStorage.setItem('token', token)
  }

  logout() {
    localStorage.clear()
    location.assign(location.origin)
  }
}
