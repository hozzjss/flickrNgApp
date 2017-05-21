import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ImgItem } from "app/models/img.model";
import { FlickrService } from "app/services/flickr.service";
import { DataService } from "app/services/data.service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  @Input() img: ImgItem
  constructor(
    private flickr: FlickrService,
    private router: Router,
    private data: DataService
  ) { }
  deleteImg() {
    if (confirm(`Are you sure you want to delete ${this.img.title}?`)) {
      this.flickr.deletePhoto(this.img.id)
          .subscribe(results => results.json().stat === 'ok' ? this.data.removeImage(this.img) : null)
    }
  }
  navigate() {
    this.router.navigate(['photo/', this.img.id])
  }

}
