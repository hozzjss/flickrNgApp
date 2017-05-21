import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FlickrService } from "app/services/flickr.service";
import { Photo } from "app/models/photos.model";
import { Subject } from "rxjs/Subject";
import { ImgItem } from "app/models/img.model";
import { DataService } from "app/services/data.service";
import { EditPhotoService } from "app/services/edit-photo.service";
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {
  edited: string;
  img: ImgItem
  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private edit: EditPhotoService,
    private location: Location
  ) { }
  back() {
    this.location.back()
    return false;
  }
  submitChanges() {
    this.edit.submitChanges(this.img)
        .subscribe((bool: boolean) => {
          this.edited = bool ? 'alert-success' : 'alert-danger'
        })
  }
  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.img = this.data.imgItems.filter((photo: ImgItem) => {
          return photo.id === params['id']
        })[0]
      })
  }

}
