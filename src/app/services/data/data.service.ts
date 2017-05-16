import { Injectable, OnInit } from '@angular/core';
import { ImgItem } from "app/models/img.model";
import { FlickrService } from "app/services/flickr/flickr.service";
import { Photo } from "app/models/photos.model";
import { Auth } from "app/models/auth.model";
import { genImgSrc } from "app/util/util";
import { Response } from '@angular/http'
import { Subject } from "rxjs/Subject";
import { AuthService } from "app/services/auth/auth.service";

@Injectable()
export class DataService implements OnInit {
  loggedIn: boolean
  imgItems = <ImgItem[]>[]
  authData: Auth
  constructor(
    private flickr: FlickrService,
    private auth: AuthService
  ) { }
  registerToken(auth: Auth) {
    this.authData = auth;
  }
  load(auth: Auth) {
    this.registerToken(auth)
    // get Photos and their info and store them for later consumption
    this.flickr.getPhotos(auth)
    this.flickr.photos
      .subscribe((photos: Photo[]) => {
        photos.forEach((photo, index) => {
          this.imgItems[index] = {}
          this.imgItems[index].id = photo.id
          // TODO: Wet code
          this.imgItems[index].link = {
            thumb: genImgSrc(photo, 'thumb'),
            small: genImgSrc(photo, 'small'),
            medium: genImgSrc(photo, 'medium'),
            large: genImgSrc(photo, 'large')
          }
          this.imgItems[index].title = photo.title
          this.flickr.getComments(photo.id)
            .subscribe((comments) => {
              this.imgItems[index].comments = comments.comments.comment
              this.flickr.getInfo(photo.id)
                .subscribe((info) => {
                  this.imgItems[index].description = info.photo.description._content;
                  this.imgItems[index].tags = info.photo.tags.tag;
                })
            })
        })
      })
  }

  removeImage(img: ImgItem) {
    console.log("BEFORE REMOVAL", this.imgItems)
    this.imgItems = this.imgItems.filter(item => img.id !== item.id)
    console.log("AFTER REMOVAL", this.imgItems)
  }

  ngOnInit(): void {
    this.loggedIn = this.flickr.login()
    this.auth.getToken()
      .filter((results) => results.json().stat === "ok")
      .subscribe((results: Response) => {
        this.load(results.json())
      })
  }
}
