import { Injectable } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { Http, Response } from '@angular/http';
import { parseParams, generateParams, generateSig } from 'app/util/util'
import { Params } from '@angular/router';
import { directory } from './flickr.directory';
import { Subject } from 'rxjs/Subject';
import { Photo, Photos } from 'app/models/photos.model';
import { Auth } from 'app/models/auth.model';
import { Comments } from 'app/models/comments.model';
import { Observable } from 'rxjs/Observable';
import { Tags } from 'app/models/tags.model';
import { PhotoInfo } from "app/models/photo-info.model";
import { MD5 } from 'crypto-js';
import { UploadSettings } from "app/models/upload-settings.model";
import { CONSUMER_KEY } from "app/keys";

@Injectable()
export class FlickrService {
  // this should be the user's token
  public photos = new Subject<Photos>()
  // this is the ingredient needed to cook 'token'
  private token: string;
  private REST_API: string = 'https://api.flickr.com/services/rest/?';

  constructor(
    private http: Http,
    private auth: AuthService
  ) { }

  uploadPhoto(settings: Params, form: HTMLFormElement) {
    const UPLOAD_API = 'https://up.flickr.com/services/upload/?';
    return this.http.post(UPLOAD_API + parseParams(settings), new FormData(form))
  }
  
  uploadData(title: string, description: string, token:string): Params {
    return {
      "api_key": CONSUMER_KEY,
      "auth_token": token,
      "format": "json",
      "nojsoncallback": "1",
      "sig": generateSig([
        "auth_token" + token,
        "description" + description,
        "title" + title,
        'format' + 'json',
        'nojsoncallback' + '1',
      ]),
    }
  }

  deletePhoto(photoId: string) {
    let params: Params = generateParams(this.token, directory.DeletePhoto, [`photo_id${photoId}`]);
    return this.http.get(this.REST_API + parseParams(params) + `photo_id=${photoId}`)
  }

  getPhotos(token:string = this.token, page: number = 1): Subject<Photos> {
    this.token = token;
    let params: Params = generateParams(this.token, directory.NotInAlbum, ['per_page20', `page${page}`]);
    this.http.get(this.REST_API + parseParams(params) + 'per_page=20&' + `page=${page}`)
      // when ready
      .subscribe((results: Response) => {
        // push the photos received to the photos subject
        const photoList: Photos = results.json();
        this.photos.next(photoList)
      });
    return this.photos;
  }

  getComments(photoId: string): Subject<Comments> {
    const comments: Subject<Comments> = new Subject();
    // prep ingredients
    const params: Params = generateParams(this.token, directory.PhotoComments, [`photo_id${photoId}`])
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
    const params: Params = generateParams(this.token, directory.PhotoInfo, [`photo_id${photoId}`])
    this.http.get(this.REST_API + parseParams(params) + `photo_id=${photoId}`)
      .subscribe(results => info.next(results.json()))
    return info
  }
}