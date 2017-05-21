import { Injectable } from '@angular/core';
import { DataService } from "app/services/data.service";
import { Http } from "@angular/http";
import { Params } from "@angular/router/src";
import { generateParams, parseParams, genImgSrc } from "app/util/util";
import { galleriesDirectory } from "app/directory";
import { Galleries, Gallery, ParsedGallery } from "app/models/galleries.model";
import { Photo, Photos } from "app/models/photos.model";
import { FlickrService } from "app/services/flickr.service";
import { Auth } from "app/models/auth.model";

@Injectable()
export class GalleriesService {
  private token: string;
  private userId: string
  private REST_API: string = 'https://api.flickr.com/services/rest/?'
  constructor(
    private http: Http,
    private flickr: FlickrService
  ) { }
  parseGallery(gallery: Gallery) {
    const photo: Photo = {
      farm: gallery.primary_photo_farm,
      id: gallery.primary_photo_id,
      secret: gallery.primary_photo_secret,
      server: gallery.primary_photo_server,
    }
    return {
      id: gallery.id,
      title: gallery.title._content,
      photo: genImgSrc(photo),
      photoCount: gallery.count_photos,
      description: gallery.description._content,
      // so the api returns a version of date that's missing the last three characters
      dateCreated: new Date(+(gallery.date_create + "000")).toString(),
    }

  }
  create(title:string, description: string) {
    const params: Params = generateParams(this.token, galleriesDirectory.create,
    [`title${title}`,`description${description}`, `primary_photo_id2780910572`])
     return this.http.get(this.REST_API + parseParams(params) 
     + `title=${title}&description=${description}&primary_photo_id=2780910572`)      
  }
  
  getGalleries(token:string = this.token, page:number = 1) {
    this.token = token
    this.userId = localStorage.getItem('nsid');
    const params: Params = generateParams(token, galleriesDirectory.getList, 
    [`user_id${this.userId}`,`per_page10`, `page${page}`])
    return this.http.get(this.REST_API + parseParams(params) +
     `user_id=${this.userId}&`+`per_page=10&` + `page=${page}` )
  }
}
