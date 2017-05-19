import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'app/services/flickr/flickr.service';
import { genImgSrc } from 'app/util/util';
import { Comment, Comments } from 'app/models/comments.model';
import { Tag, Tags } from 'app/models/tags.model';
import { Photo } from 'app/models/photos.model';
import { ImgItem } from "app/models/img.model";
import { DataService } from "app/services/data/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    public data: DataService
  ) { }

  ngOnInit() {
    
  }

}
