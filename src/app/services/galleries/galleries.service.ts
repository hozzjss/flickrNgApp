import { Injectable } from '@angular/core';
import { DataService } from "app/services/data/data.service";
import { Http } from "@angular/http";
import { Params } from "@angular/router/src";
import { generateParams, parseParams, genImgSrc } from "app/util/util";
import { directory } from "app/services/galleries/galleries.directory";
import { Galleries, Gallery, ParsedGallery } from "app/models/galleries.model";
import { Photo, Photos } from "app/models/photos.model";
import { FlickrService } from "app/services/flickr/flickr.service";
import { Auth } from "app/models/auth.model";

@Injectable()
export class GalleriesService {
  private userId: string
  private auth: Auth
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
      dateCreated: new Date(+gallery.date_create).toString(),
    }

  }
  create(title:string, description: string, auth: Auth = this.auth) {
    const params: Params = generateParams(auth, directory.create,
    [`title${title}`,`description${description}`, `primary_photo_id2780910572`])
     this.http.get(this.REST_API + parseParams(params) 
     + `title=${title}&description=${description}&primary_photo_id=2780910572`)
         .subscribe(results => {
           this.getGalleries(auth)
         })
  }
  
  getGalleries(auth:Auth = this.auth, page:number = 1) {
    this.auth = auth
    this.userId = this.auth.auth.user.nsid;
    const params: Params = generateParams(auth, directory.getList, 
    [`user_id${this.userId}`,`per_page10`, `page${page}`])
    return this.http.get(this.REST_API + parseParams(params) +
     `user_id=${this.userId}&`+`per_page=10&` + `page=${page}` )
  }
}
