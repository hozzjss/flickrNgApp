import { Injectable } from '@angular/core';
import { ImgItem } from "app/models/img.model";
import { FlickrService } from "app/services/flickr/flickr.service";
import { Photo, Photos } from "app/models/photos.model";
import { Auth } from "app/models/auth.model";
import { genImgSrc } from "app/util/util";
import { Response } from '@angular/http'
import { Subject } from "rxjs/Subject";
import { AuthService } from "app/services/auth/auth.service";
import { ParsedGallery, Galleries, Gallery } from "app/models/galleries.model";
import { GalleriesService } from "app/services/galleries/galleries.service";
import { Router } from "@angular/router";

@Injectable()
export class DataService {
  token: string;
  loggedIn: boolean
  imgItems = <ImgItem[]>[]
  galleries = <ParsedGallery[]>[]
  hasNoGalleries: boolean = false
  hasNoPhotos: boolean = false
  uploadSuccess: boolean = false
  newGallerySuccess: boolean = false
  photoPages: number
  currentPagePhotos: number = 1
  galleryPages: number
  currentPageGalleries: number = 1

  constructor(
    private flickr: FlickrService,
    private auth: AuthService,
    private gallService: GalleriesService,
    private router: Router
  ) { }
  registerToken(token: string) {
    this.token = token;
  }

  reload() {
    this.load(this.token)
  }
  loadMore(page: number): void {

  }
  load(token: string): void {
    this.registerToken(token)
    // get Photos and their info and store them for later consumption
    this.flickr.getPhotos(token)
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
    this.gallService.getGalleries(this.token)
      .subscribe(results => {
        const parsedResults: Galleries = results.json()
        const rawGalleries: Gallery[] = parsedResults.galleries.gallery;
        const galleryPages: number = parsedResults.galleries.page
        // reset galleries
        this.galleries = []
        // push received gals 'pun intended'
        this.galleries.push(...rawGalleries.map(this.gallService.parseGallery))
        // store how many pages of 20s the user has
        this.galleryPages = this.galleryPages || galleryPages
        // if the user has no galleries to notify
        this.hasNoGalleries = !this.hasNoGalleries && this.galleries.length < 1;
      });
  }
  morePhotos() {
    if (this.currentPagePhotos < this.photoPages) {
      // flip the page
      this.currentPagePhotos += 1
      // get more photos and then add them
      this.flickr.getPhotos(this.token, this.currentPagePhotos)
        .subscribe(photos => {
          // loops <3
          // push photos one by one and asyncronously add their comments
          for (var i = 0; i < photos.photos.photo.length; i++)
            this.addPhotos(photos.photos.photo[i])
        })
    }
  }
  moreGalleries() {
    if (this.currentPageGalleries < this.galleryPages) {
      this.currentPageGalleries += 1
      this.gallService.getGalleries(this.token, this.currentPageGalleries)
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
    const links = ['thumb', 'small', 'medium', 'large'].map(size => genImgSrc(photo, size));
    this.imgItems[index].link = {
      thumb: links[0],
      small: links[1],
      medium: links[2],
      large: links[3]
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

  runApp(stayLoggedIn: boolean = false, token: string = localStorage.getItem('token'), nsid: string = localStorage.getItem('nsid')) {
    // no token no problem!
    if (!token) {
      this.auth.userLogin()
    } else {
      // if the user chooses to stay logged in even after he reopens his browser
      if (stayLoggedIn) {
        this.auth.stayLoggedIn(token, nsid)
      }
      this.loggedIn = true;
      this.router.navigate(['dashboard'])
      this.load(token)
    }
  }
}
