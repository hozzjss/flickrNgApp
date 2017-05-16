import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'app/services/flickr/flickr.service';
import { SearchService } from "app/services/search/search.service";
import { DataService } from "app/services/data/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  frob: string;
  state: string;
  constructor(
    private flickr: FlickrService,
    private search: SearchService,
    private data: DataService
  ) { 
  }

  ngOnInit(): void {
    this.data.ngOnInit()
  }
}
