import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { search } from 'app/services/search/search.directory'
import { FlickrService } from "app/services/flickr/flickr.service";
import { Params } from "@angular/router";
import { generateParams, parseParams, Regexes } from "app/util/util";
import { Auth } from "app/models/auth.model";
import { FlickrResult } from "app/models/result.model";
import { Observable } from "rxjs/Observable";
import { DataService } from "app/services/data/data.service";

@Injectable()
export class SearchService {
  private REST_API: string = 'https://api.flickr.com/services/rest/?';
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
    const params: Params = generateParams(this.data.token, search.byEmail, [`find_email${email}`]);
    return this.http.get(this.REST_API + parseParams(params) + `find_email=${email}`)
  }

  private findUsername(username: string) {
    const params: Params = generateParams(this.data.token, search.byUsername, [`username${username}`]);
    return this.http.get(this.REST_API + parseParams(params) + `username=${username}`);
  }
}
