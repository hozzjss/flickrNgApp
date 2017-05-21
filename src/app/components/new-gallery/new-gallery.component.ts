import { Component, OnInit } from '@angular/core';
import { GalleriesService } from "app/services/galleries.service";
import { DataService } from "app/services/data.service";

@Component({
  selector: 'app-new-gallery',
  templateUrl: './new-gallery.component.html',
  styleUrls: ['./new-gallery.component.css']
})
export class NewGalleryComponent implements OnInit {

  constructor(
    private gallservice: GalleriesService,
    private data: DataService
  ) { }
  submit(title: string, description: string, form:HTMLFormElement) {
    this.gallservice.create(title, description)
      .subscribe(results => {
           this.gallservice.getGalleries();
           form.reset();
           this.data.newGallerySuccess = true; 
           setTimeout(()=> this.data.newGallerySuccess = false, 2000)
         })
  }
  ngOnInit() {
  }

}
