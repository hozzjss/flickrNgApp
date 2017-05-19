import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'app/services/flickr/flickr.service';
import { SearchService } from "app/services/search/search.service";
import { DataService } from "app/services/data/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  frob: string;
  state: string;
  constructor(
    private flickr: FlickrService,
    private search: SearchService,
    public data: DataService
  ) { 
  }
  onScroll() {
    if (location.href.indexOf("dashboard") !== -1) {
      this.data.morePhotos()
    }
    if (location.href.indexOf("galleries") !== -1) {
      this.data.moreGalleries()
    }
  }
  ngOnInit(): void {
    this.data.ngOnInit()
  }
  
}
