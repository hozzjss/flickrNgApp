import { Component, OnInit } from '@angular/core';
import { GalleriesService } from "app/services/galleries/galleries.service";

@Component({
  selector: 'app-new-gallery',
  templateUrl: './new-gallery.component.html',
  styleUrls: ['./new-gallery.component.css']
})
export class NewGalleryComponent implements OnInit {

  constructor(
    private gallservice: GalleriesService
  ) { }
  submit(title: string, description: string) {
    this.gallservice.create(title, description)
  }
  ngOnInit() {
  }

}
