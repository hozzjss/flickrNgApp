import { Injectable, OnInit } from '@angular/core';
import { ImgItem } from "app/models/img.model";
import { FlickrService } from "app/services/flickr/flickr.service";
import { Photo, Photos } from "app/models/photos.model";
import { Auth } from "app/models/auth.model";
import { genImgSrc } from "app/util/util";
import { Response } from '@angular/http'
import { Subject } from "rxjs/Subject";
import { AuthService } from "app/services/auth/auth.service";
import { ParsedGallery, Galleries } from "app/models/galleries.model";
import { GalleriesService } from "app/services/galleries/galleries.service";

@Injectable()
export class DataService implements OnInit {
  loggedIn: boolean
  imgItems = <ImgItem[]>[]
  galleries = <ParsedGallery[]>[]
  hasNoGalleries: boolean = false
  hasNoPhotos: boolean = false
  uploadSuccess: boolean = false
  authData: Auth
  photoPages: number
  currentPagePhotos: number = 1
  galleryPages: number
  currentPageGalleries: number = 1

  constructor(
    private flickr: FlickrService,
    private auth: AuthService,
    private gallService: GalleriesService
  ) { }
  registerToken(auth: Auth) {
    this.authData = auth;
  }

  reload() {
    this.load(this.authData)
  }
  loadMore(page: number): void {

  }
  load(auth: Auth): void {
    this.registerToken(auth)
    // get Photos and their info and store them for later consumption
    this.flickr.getPhotos(auth)
    this.flickr.photos
      .subscribe((photos: Photos) => {
        this.photoPages = photos.photos.pages;
        // to support reload and not to confuse it with morePhotos()
        this.imgItems = []
        this.hasNoPhotos = !this.hasNoPhotos && +photos.photos.total < 1;
        // good ol' loops, you should visit'em sometime 
        for (var i = 0; i < photos.photos.photo.length; i++)
          this.addPhotos(photos.photos.photo[i])
      })

  }
  getGalleries() {
    this.gallService.getGalleries(this.authData)
      .subscribe(results => {
        const res: Galleries = results.json();
        this.galleries = []
        this.galleries.push(...res.galleries.gallery.map(this.gallService.parseGallery))
        this.galleryPages = this.galleryPages || res.galleries.page
        this.hasNoGalleries = !this.hasNoGalleries && this.galleries.length < 1;
      });
  }
  morePhotos() {
    if (this.currentPagePhotos < this.photoPages) {
      this.currentPagePhotos += 1
      this.flickr.getPhotos(this.authData, this.currentPagePhotos)
        .subscribe(photos => {
          for (var i = 0; i < photos.photos.photo.length; i++)
            this.addPhotos(photos.photos.photo[i])
        })
    }
  }
  moreGalleries() {
    if (this.currentPageGalleries < this.galleryPages) {
      this.currentPageGalleries += 1
      this.gallService.getGalleries(this.authData, this.currentPageGalleries)
        .subscribe(results => {
          const res: Galleries = results.json()
          this.galleries.push(...res.galleries.gallery.map(this.gallService.parseGallery))
        })
    }
  }
  addPhotos(photo: Photo) {
    const index = this.imgItems.length
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
  }
  removeImage(img: ImgItem) {
    this.imgItems = this.imgItems.filter(item => img.id !== item.id)
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
