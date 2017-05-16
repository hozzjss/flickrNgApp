import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Tag } from "app/models/tags.model";
import { Comment } from "app/models/comments.model";
import { ImgItem } from "app/models/img.model";
import { FlickrService } from "app/services/flickr/flickr.service";
import { DataService } from "app/services/data/data.service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
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

  ngOnInit() {

  }

}
