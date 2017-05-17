import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common'
import { DataService } from "app/services/data/data.service";
import { ParsedGallery } from "app/models/galleries.model";
import { EditGalleryService } from "app/services/edit-gallery/edit-gallery.service";

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit {
  edited: string;
  gallery: ParsedGallery
  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private edit: EditGalleryService,
    private location: Location
  ) { }
  back() {
    this.location.back()
    return false;
  }
  submitChanges() {
    this.edit.submitChanges(this.gallery)
        .subscribe((bool: boolean) => {
          this.edited = bool ? 'alert-success' : 'alert-danger'
        })
  }
  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.gallery = this.data.galleries.filter((gallery) => {
          return gallery.id === params['id']
        })[0]
      })
  }

}
