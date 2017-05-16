import { Injectable } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { Http, Response } from '@angular/http';
import { parseParams, generateParams } from 'app/util/util'
import { Params } from '@angular/router';
import { directory } from './flickr.directory';
import { Subject } from 'rxjs/Subject';
import { Photo, Photos } from 'app/models/photos.model';
import { Auth } from 'app/models/auth.model';
import { Comments } from 'app/models/comments.model';
import { Observable } from 'rxjs/Observable';
import { Tags } from 'app/models/tags.model';
import { PhotoInfo } from "app/models/photo-info.model";

@Injectable()
export class FlickrService {
  // this should be the user's token
  private token: string;
  public photos = new Subject<Photo[]>()
  // this is the ingredient needed to cook 'token'
  private frob: string;
  // authData contains 'token' and other data related to the user
  private authData: Auth;
  private REST_API: string = 'https://api.flickr.com/services/rest/?';

  constructor(
    private http: Http,
    private auth: AuthService
  ) { }
  login(): boolean {
    // check for frob in url
    // if frob is obtained authenticate with it
    if (location.search.length > 0) {
      this.frob = location.search.substr(6);
      this.auth.authenticate(this.frob);
      return true;
    }
    // if the user is not authenenticated redirect to login
    else if (!this.auth.isAuthenticated()) {
      this.auth.userLogin();
    }
  }

  // getAccessToken(): Observable<Response> {
  //   return this.auth.getToken()
  // }

  deletePhoto(photoId: string) {
    let params: Params = generateParams(this.authData, directory.DeletePhoto, [`photo_id${photoId}`]);
    return this.http.get(this.REST_API + parseParams(params) + `photo_id=${photoId}`)
  }

  getPhotos(authData: Auth = this.authData): Subject<Photo[]> {
    this.authData = authData
    let params: Params = generateParams(this.authData, directory.NotInAlbum, ['per_page20']);
    this.http.get(this.REST_API + parseParams(params) + 'per_page=20')
      // when ready
      .subscribe((results: Response) => {
        // push the photos received to the photos subject
        const photoList: Photos = results.json();
        this.photos.next(photoList.photos.photo)
      });
    return this.photos;
  }

  getComments(photoId: string): Subject<Comments> {
    const comments: Subject<Comments> = new Subject();
    // prep ingredients
    const params: Params = generateParams(this.authData, directory.PhotoComments, [`photo_id${photoId}`])
    // cook!
    this.http.get(this.REST_API + parseParams(params) + `photo_id=${photoId}`)
      .subscribe((results) => {
        // push received Comments to the subject
        comments.next(results.json())
      })
    // and give control back
    return comments;
  }
  
  getInfo(photoId: string): Subject<PhotoInfo> {
    const info = new Subject<PhotoInfo>()
    const params: Params = generateParams(this.authData, directory.PhotoInfo, [`photo_id${photoId}`])
    this.http.get(this.REST_API + parseParams(params) + `photo_id=${photoId}`)
      .subscribe(results => info.next(results.json()))
    return info
  }
}