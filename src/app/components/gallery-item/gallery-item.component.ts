import { Component, OnInit, Input } from '@angular/core';
import { ParsedGallery } from "app/models/galleries.model";
import { GalleriesService } from "app/services/galleries/galleries.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {
  @Input() gallery: ParsedGallery

  constructor(
    private gallService: GalleriesService,
    private router: Router
  ) { 
  }
  
  navigate() {
    this.router.navigate(['gallery/', this.gallery.id])
  }
  ngOnInit() {
  }

}
