import { Component, OnInit } from '@angular/core';
import { GalleriesService } from "app/services/galleries.service";
import { DataService } from "app/services/data.service";
import { Gallery } from "app/models/galleries.model";

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  hasGalleries: boolean
  constructor(
    public data: DataService
  ) { }

  ngOnInit() {
    this.data.loadGals()
  }

}
