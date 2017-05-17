import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { parseParams, redirectTo, generateSig } from 'app/util/util';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  // flickr's credentials
  private CONSUMER_KEY: string = 'd233b1ab49300a208f6d183170da04b6';
  // state
  private authinticated: boolean;

  // needed to obtain the user's token
  private frob: string;
  // token

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
      api_key: this.CONSUMER_KEY,
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
    this.frob = frob;
    this.router.navigate(['dashboard'])
  }
  getToken(): Observable<Response> {
    const REST_API = 'https://api.flickr.com/services/rest/?';
    // getting user's token params
    // not a cool format but the most modular and usable one by far =D
    const params: Params = {
      api_key: this.CONSUMER_KEY,
      api_sig: generateSig([
        'method' + 'flickr.auth.getToken',
        'format' + 'json',
        'frob' + this.frob,
        'nojsoncallback' + '1'
      ]),
      'format': 'json',
      'frob': this.frob,
      'method': 'flickr.auth.getToken',
      'nojsoncallback': 1,
    }
    // give control back so that the token is given to who requested it
    return this.http.get(REST_API + parseParams(params))
  }
}
