import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { FlickrService } from "app/services/flickr.service";
import { Params } from "@angular/router";
import { generateParams, parseParams, Regexes } from "app/util/util";
import { Auth } from "app/models/auth.model";
import { FlickrResult } from "app/models/result.model";
import { Observable } from "rxjs/Observable";
import { DataService } from "app/services/data.service";
import { searchDirectory } from "app/directory";
import { REST_API } from "app/API_ENDPOINTS";

@Injectable()
export class SearchService {
  constructor(
    private http: Http,
    private flickr: FlickrService,
    private data: DataService
  ) { }

  private processSubject(subject: Subject<string>) {
    return subject
      .debounceTime(600)
      .distinctUntilChanged()
      .filter(term => term.length > 3)
  }

  byEmail(terms: Subject<string>): Observable<Response> {
    return this.processSubject(terms)
      .filter(email => Regexes.email.test(email))
      .switchMap(email => this.findEmail(email))
  }

  byUsername(terms: Subject<string>): Observable<Response> {
    return this.processSubject(terms)
      .switchMap(term => this.findUsername(term))
  }

  private findEmail(email) {
    const params: Params = generateParams(this.data.token, searchDirectory.byEmail, [`find_email${email}`]);
    return this.http.get(REST_API + parseParams(params) + `find_email=${email}`)
  }

  private findUsername(username: string) {
    const params: Params = generateParams(this.data.token, searchDirectory.byUsername, [`username${username}`]);
    return this.http.get(REST_API + parseParams(params) + `username=${username}`);
  }
}
